import PusherManager from './PusherManager'
import GameEventsManager from './GameEventsManager'
import GameMatchmakingManager from './GameMatchmakingManager'
import GameTurnsManager from './GameTurnsManager'
import { GameAction, isResponseAction } from './type/GameAction'
import { GameActionMessage } from './type/GameActionMessage'
import GameActionsManager from './GameActionsManager'
import GameStateManager from './GameStateManager'
import CardsManager from './Cards/CardsManager'
import { Channel } from 'pusher-js';
import { EventName } from './type/EventName'
import { Card } from './Cards/Card'
import GameEventsAdder from './GameEventsAdder'

export default class GameManager {
    public static instance: GameManager
    private pusherManager: PusherManager
    private gameEventsManager: GameEventsManager
    private gameMatchmakingManager: GameMatchmakingManager
    private gameTurnsManager: GameTurnsManager
    private gameActionsManager: GameActionsManager;
    private gameStateManager: GameStateManager;
    private cardsManager: CardsManager;
    public events: GameEventsAdder;

    private constructor() {
        this.pusherManager = new PusherManager()
        this.gameEventsManager = GameEventsManager.getInstance()
        this.gameMatchmakingManager = new GameMatchmakingManager(this.pusherManager)
        this.gameActionsManager = new GameActionsManager()
        this.gameTurnsManager = new GameTurnsManager(30000) // 30 seconds for testing
        this.gameStateManager = new GameStateManager()
        this.cardsManager = new CardsManager()
        this.events = new GameEventsAdder()

        this.setLocalListeners()
    }

    public initPusher(username: string) {
        this.pusherManager.initPusher(username)
        if (this.gameMatchmakingManager.getUserName()) return
        this.setUserName(username)
    }

    public joinMatchmaking() {
        this.gameMatchmakingManager.joinMatchmaking()
    }

    public leaveMatchmaking() {
        this.gameMatchmakingManager.leaveMatchmaking()
    }

    public setUserName(userName: string) {
        this.gameMatchmakingManager.setUserName(userName)
    }

    public getUserName(): string {
        return this.gameMatchmakingManager.getUserName()
    }

    public sendAction(action: GameActionMessage) {
        if (!this.gameStateManager.isMyTurn()) throw new Error("Not my turn")
        if(action.action === GameAction.PLACE_CARD){
            this.gameStateManager.setOppoentPlaysCard()
        }
        this.gameTurnsManager.sendAction(action)
        this.gameActionsManager.processMyAction(action)
        
    }

    public getPossibleActions(): Map<GameAction, boolean> {
        return this.gameActionsManager.getPossibleActions()
    }

    public setLastAction(action: GameAction) {
        this.gameActionsManager.setLastAction(action)
    }


    public finishFirstTurn() {
        this.gameActionsManager.finishFirstTurn()
    }

    public resetPossibleActions() {
        this.gameActionsManager.resetPossibleActions()
    }

    private onJoiningLobby() {
        this.gameTurnsManager.setUpGameChannel(this.gameMatchmakingManager.getMatchChannel())
        this.setGameChannelListeners()
        this.gameStateManager.setOpponentTurn()
        this.gameStateManager.startNewRound()
    }
    private onMatchFound() {
        this.gameTurnsManager.setUpGameChannel(this.gameMatchmakingManager.getMatchChannel())
        this.setGameChannelListeners()
        this.gameStateManager.setMyTurn()
        this.gameStateManager.setImHand()
        this.gameEventsManager.triggerOnGameStart()
        this.gameEventsManager.triggerOnMyTurnStart()
        this.gameStateManager.startNewRound()
        this.gameStateManager.setIPlayCard()
    }

    private onEnvidoPlayed(isAccepted: boolean) {
        const gameChannel = this.gameTurnsManager.getGameChannel() as Channel;
        if (isAccepted) {
            gameChannel?.trigger(EventName.SHOW_ENVIDO, { value: this.cardsManager.getEnvidoPoints() })
        } else {
            this.gameStateManager.givePoints(true, this.gameActionsManager.getEnvidoAccum(true))
        }
    }

    private onMyEnvidoPlayed(isAccepted: boolean) {
        const gameChannel = this.gameTurnsManager.getGameChannel() as Channel;
        if (isAccepted) {
            gameChannel?.trigger(EventName.ACCEPT_ENVIDO, {})
        } else {
            this.gameStateManager.givePoints(false, this.gameActionsManager.getEnvidoAccum(true))
        }
    }

    private onTrucoDenied(IDeny: boolean) {
        this.gameStateManager.givePoints(!IDeny, this.gameActionsManager.getTrucoAccum(true))
        this.startNewRound()
    }

    private onMyTurnEnd() {
        this.gameStateManager.setOpponentTurn()
    }

    private onTrucoPointCalculation(amIWinner: number) {
        this.gameStateManager.trucoPointCalculation(amIWinner)
    }

    private onTrucoWinner(IWon: boolean) {
        this.gameStateManager.givePoints(IWon, this.gameActionsManager.getTrucoAccum())
        this.startNewRound()
    }

    private startNewRound() {
        this.gameActionsManager.resetPossibleActions()
        if (!this.gameStateManager.amIHand()) {
            this.gameStateManager.setMyTurn()
            this.gameStateManager.setImHand()
            this.gameTurnsManager.giveCards(this.cardsManager.giveCards())
            this.gameEventsManager.triggerOnMyTurnStart()
            this.gameStateManager.startNewRound()
            this.gameStateManager.setIPlayCard()
        } else {
            this.gameStateManager.setOpponentTurn()
            this.gameStateManager.setImNotHand()
            this.gameEventsManager.triggerOnMyTurnEnd()
            this.gameStateManager.setOppoentPlaysCard()
        }
    }

    private onMyPlayCard(card: Card) {
        this.cardsManager.playCard(card)
    }

    private onTurnMissed() {
        const actions = this.gameActionsManager.getPossibleActions()
        if(actions.get(GameAction.DENIED)){
            this.sendAction(new GameActionMessage(GameAction.DENIED,{}))
        }else{
            this.sendAction(new GameActionMessage(GameAction.PLACE_CARD, { card: this.cardsManager.getFirstCard()}))
        }
    }

    private onOpponentFinishTurn(gameActionMessage: GameActionMessage) {
        this.gameActionsManager.setLastAction(gameActionMessage.action)
        if (isResponseAction(gameActionMessage.action) && !this.gameStateManager.doIPlayCard()){
            this.gameTurnsManager.sendAction(new GameActionMessage(GameAction.NONE, {}))
            return;
        }
        if (gameActionMessage.action === GameAction.PLACE_CARD) {
            this.cardsManager.playOpponentCard(gameActionMessage.payload.card)
            this.gameStateManager.setIPlayCard()
        }
        if (!this.gameStateManager.isRoundEnded()) {
            this.gameEventsManager.triggerOnMyTurnStart()
        } else {
            this.gameStateManager.startNewRound()
        }
    }

    private onGameStart() {
        const opponentCards = this.cardsManager.giveCards()
        this.gameTurnsManager.giveCards(opponentCards)

    }

    private onMyTurnStart() {
        this.gameStateManager.setMyTurn()
    }

    private setLocalListeners() {
        this.gameEventsManager.addOnJoiningLobbyListener(this.onJoiningLobby.bind(this))
        this.gameEventsManager.addOnMatchFoundListener(this.onMatchFound.bind(this))
        this.gameEventsManager.addOnEnvidoPlayedListener(this.onEnvidoPlayed.bind(this))
        this.gameEventsManager.addOnMyEnvidoPlayedListener(this.onMyEnvidoPlayed.bind(this))
        this.gameEventsManager.addOnMyTurnEndListener(this.onMyTurnEnd.bind(this))
        this.gameEventsManager.addOnTrucoPointCalculationListener(this.onTrucoPointCalculation.bind(this))
        this.gameEventsManager.addOnTrucoWinnerListener(this.onTrucoWinner.bind(this))
        this.gameEventsManager.addOnTrucoDeniedListener(this.onTrucoDenied.bind(this))
        this.gameEventsManager.addOnMyPlayCardListener(this.onMyPlayCard.bind(this))
        this.gameEventsManager.addOnTurnMissedListener(this.onTurnMissed.bind(this))
        this.gameEventsManager.addOnOpponentFinishTurnListener(this.onOpponentFinishTurn.bind(this))
        this.gameEventsManager.addOnGameStartListener(this.onGameStart.bind(this))
        this.gameEventsManager.addOnMyTurnStartListener(this.onMyTurnStart.bind(this))
    }

    private setGameChannelListeners() {
        const gameChannel = this.gameTurnsManager.getGameChannel() as Channel;
        gameChannel.bind(EventName.GIVE_CARDS, (newCards: Card[]) => {
            this.cardsManager.receiveCards(newCards)
        })
        gameChannel.bind(EventName.SHOW_ENVIDO, (data: { value: number }) => {
            const opponentWon = this.gameStateManager.envidoPlayed(data.value, this.cardsManager.getEnvidoPoints())
            this.gameStateManager.givePoints(!opponentWon, this.gameActionsManager.getEnvidoAccum())
            gameChannel.trigger(EventName.ENVIDO_ENDED, { opponentWon: opponentWon })
        })
        gameChannel.bind(EventName.ENVIDO_ENDED, (result: { opponentWon: boolean }) => {
            this.gameStateManager.givePoints(result.opponentWon, this.gameActionsManager.getEnvidoAccum())
        })

    }

    public static getInstance(): GameManager {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager()
        }
        return GameManager.instance
    }
}
