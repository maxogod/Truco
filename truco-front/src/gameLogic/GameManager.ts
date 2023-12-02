import PusherManager from './PusherManager'
import GameEventsManager from './GameEventsManager'
import GameMatchmakingManager from './GameMatchmakingManager'
import GameTurnsManager from './GameTurnsManager'
import { GameAction } from './type/GameAction'
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
    private turnFix: boolean

    private constructor() {
        this.pusherManager = new PusherManager()
        this.gameEventsManager = GameEventsManager.getInstance()
        this.gameMatchmakingManager = new GameMatchmakingManager(this.pusherManager)
        this.gameActionsManager = new GameActionsManager()
        this.gameTurnsManager = new GameTurnsManager(60000) // 60 seconds for testing
        this.gameStateManager = new GameStateManager()
        this.cardsManager = new CardsManager()
        this.events = new GameEventsAdder()
        this.turnFix = false
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
        this.gameTurnsManager.sendAction(action)
        this.gameActionsManager.handleAction(action, true)
        this.gameActionsManager.lateTrigger()
    }

    private onOpponentAction(gameActionMessage: GameActionMessage) {
        this.gameActionsManager.handleAction(gameActionMessage)
        this.gameStateManager.setMyTurn()
        this.gameActionsManager.lateTrigger()
        if (!this.turnFix) {
            this.gameEventsManager.triggerOnMyTurnStart()
        } else {
            this.turnFix = false
        }
    }

    public getPossibleActions(): Map<GameAction, boolean> {
        return this.gameActionsManager.getPossibleActions()
    }

    private finishEnvidoPhase() {
        this.gameActionsManager.finishEnvidoPhase()
    }

    public resetPossibleActions() {
        this.gameActionsManager.resetPossibleActions()
    }

    private onJoiningLobby() {
        this.gameTurnsManager.setUpGameChannel(this.gameMatchmakingManager.getMatchChannel())
        this.setGameChannelListeners()
        this.startRoundOpponentIsHand()

    }
    private onMatchFound() {
        this.gameTurnsManager.setUpGameChannel(this.gameMatchmakingManager.getMatchChannel())
        this.setGameChannelListeners()
        this.gameEventsManager.triggerOnGameStart()
        this.startRoundImHand()
    }

    private onEnvidoPlayed(isAccepted: boolean, iCalled: boolean) {
        const gameChannel = this.gameTurnsManager.getGameChannel() as Channel;
        if (isAccepted) {
            if (iCalled) {
                gameChannel?.trigger(EventName.ACCEPT_ENVIDO, {})
            } else {
                gameChannel?.trigger(EventName.SHOW_ENVIDO, { value: this.cardsManager.getEnvidoPoints() })
            }
        } else {
            this.gameStateManager.givePoints(!iCalled, this.gameActionsManager.getEnvidoAccum())
        }
        this.handleTurnFix(iCalled)
    }

    private onTrucoResponse(isAccepted: boolean, iCalled: boolean) {
        if (!isAccepted) {
            this.gameStateManager.givePoints(!iCalled, this.gameActionsManager.getTrucoAccum())
            this.gameEventsManager.triggerOnNewRound()
        } else {
            this.handleTurnFix(iCalled)
        }
    }

    private handleTurnFix(iCalled: boolean, isNewRound: boolean = false) {
        if (!(iCalled || this.gameStateManager.doIPlayCard()) || isNewRound) {
            this.turnFix = true
            this.forceTurnEnd()
        }
    }

    private onMyTurnEnd() {
        this.gameStateManager.setOpponentTurn()
        this.gameTurnsManager.onMyTurnEnd()
        if (this.turnFix) {
            throw GameEventsManager.STOP_PROPAGATION_ERROR
        }
    }

    private onTrucoPointCalculation(amIWinner: number) {
        this.gameStateManager.trucoPointCalculation(amIWinner)
    }

    private onTrucoWinner(IWon: boolean) {
        this.gameStateManager.givePoints(IWon, this.gameActionsManager.getTrucoAccum())
        this.gameEventsManager.triggerOnNewRound()
    }

    private onNewRound() {
        this.gameActionsManager.restart()
        if (this.iGoFirst()) {
            this.gameTurnsManager.giveCards(this.cardsManager.giveCards())
            this.startRoundImHand()
        } else {
            if (this.gameStateManager.isMyTurn()) this.handleTurnFix(false, true)
            this.startRoundOpponentIsHand()
        }
    }

    private forceTurnEnd() {
        this.sendAction(new GameActionMessage(GameAction.NONE, {}))
    }

    private iGoFirst(): boolean {
        return !this.gameStateManager.amIHand()
    }

    private startRoundImHand() {
        this.gameStateManager.setMyTurn()
        this.gameStateManager.setImHand()
        this.gameStateManager.setIPlayCard()
        this.gameStateManager.startNewRound()
        this.gameEventsManager.triggerOnMyTurnStart()
    }

    private startRoundOpponentIsHand() {
        this.gameStateManager.setOpponentTurn()
        this.gameStateManager.setImNotHand()
        this.gameStateManager.setOppoentPlaysCard()
        this.gameStateManager.startNewRound()
    }

    private onCardPlayed(iCalled: boolean, card: Card) {
        if (iCalled) {
            this.gameStateManager.setOppoentPlaysCard()
            this.cardsManager.playCard(card)
        } else {
            this.gameStateManager.setIPlayCard()
            this.cardsManager.playOpponentCard(card)
        }
    }

    private onTurnMissed() {
        const actions = this.gameActionsManager.getPossibleActions()
        if (actions.get(GameAction.NO_QUIERO)) {
            this.sendAction(new GameActionMessage(GameAction.NO_QUIERO, {}))
        } else {
            this.sendAction(new GameActionMessage(GameAction.PLACE_CARD, { card: this.cardsManager.getFirstCard() }))
        }
    }

    private onGameStart() {
        const opponentCards = this.cardsManager.giveCards()
        this.gameTurnsManager.giveCards(opponentCards)
    }

    private gameEnd() {
        this.regenerateInstance()
    }

    private onIrAlMazo(iCalled: boolean, isEnvidoPhase: boolean) {
        if (isEnvidoPhase) {
            this.gameStateManager.givePoints(!iCalled, this.gameActionsManager.getEnvidoAccum())
        }
        this.gameStateManager.givePoints(!iCalled, this.gameActionsManager.getTrucoAccum())
        this.gameEventsManager.triggerOnNewRound()
    }

    private setLocalListeners() {
        this.gameEventsManager.addOnJoiningLobbyListener(this.onJoiningLobby.bind(this))
        this.gameEventsManager.addOnMatchFoundListener(this.onMatchFound.bind(this))
        this.gameEventsManager.addOnGameEndListener(this.gameEnd.bind(this))
        this.gameEventsManager.addOnGameStartListener(this.onGameStart.bind(this))

        this.gameEventsManager.addOnOpponentActionListener(this.onOpponentAction.bind(this))

        this.gameEventsManager.addOnMyTurnEndListener(this.onMyTurnEnd.bind(this))
        this.gameEventsManager.addOnTurnMissedListener(this.onTurnMissed.bind(this))
        this.gameEventsManager.addOnNewRoundListener(this.onNewRound.bind(this))

        this.gameEventsManager.addOnEnvidoPlayedListener(this.onEnvidoPlayed.bind(this))

        this.gameEventsManager.addOnTrucoPointCalculationListener(this.onTrucoPointCalculation.bind(this))
        this.gameEventsManager.addOnTrucoWinnerListener(this.onTrucoWinner.bind(this))
        this.gameEventsManager.addOnTrucoResponseListener(this.onTrucoResponse.bind(this))
        this.gameEventsManager.addOnCardPlayedListener(this.onCardPlayed.bind(this))

        this.gameEventsManager.addOnIrAlMazoListener(this.onIrAlMazo.bind(this))

        this.gameEventsManager.addOnFinishEnvidoPhaseListener(this.finishEnvidoPhase.bind(this))
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

    private regenerateInstance() {
        this.pusherManager.disconnectAll()
        this.gameMatchmakingManager.restart()
        this.gameActionsManager.restart()
        this.gameTurnsManager.restart() // 60 seconds for testing
        this.gameStateManager.restart()
        this.cardsManager.restart()
    }


}
