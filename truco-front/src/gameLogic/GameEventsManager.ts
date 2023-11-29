import { Card } from "./Cards/Card";
import { GameActionMessage } from "./type/GameActionMessage";

export default class GameEventsManager {

    public static instance: GameEventsManager

    onMatchFoundListeners: ((opponentName: string) => void)[] = []

    onJoiningLobbyListeners: ((opponentName: string) => void)[] = []

    onGameStartListeners: (() => void)[] = []

    onOpponentFinishTurnListeners: ((gameActionMessage: GameActionMessage) => void)[] = []

    onMyTurnEndListeners: (() => void)[] = []

    onTurnMissedListeners: (() => void)[] = []

    onGiveCardsListeners: (() => void)[] = []

    onOpponentPlayCardListeners: ((card: Card) => void)[] = []

    onMyPlayCardListeners: ((card: Card) => void)[] = []

    onTrucoPointCalculationListeners: ((amIWinner: number) => void)[] = []

    onEnvidoPlayedListeners: ((isAccepted: boolean) => void)[] = []

    onMyEnvidoPlayedListeners: ((isAccepted: boolean) => void)[] = []

    onTrucoDeniedListeners: ((iDeny: boolean) => void)[] = []

    onTrucoWinnerListeners: ((IWon: boolean) => void)[] = []

    onGetCardsListeners: ((cards: Card[]) => void)[] = []

    onMyTurnStartListeners: (() => void)[] = []

    onFinishFirstTurnListeners: (() => void)[] = []



    addOnMatchFoundListener(handler: (opponentName: string) => void) {
        this.onMatchFoundListeners.push(handler)
    }

    addOnJoiningLobbyListener(handler: (opponentName: string) => void) {
        this.onJoiningLobbyListeners.push(handler)
    }

    addOnGameStartListener(handler: () => void) {
        this.onGameStartListeners.push(handler)
    }

    addOnOpponentFinishTurnListener(handler: (gameActionMessage: GameActionMessage) => void) {
        this.onOpponentFinishTurnListeners.push(handler)
    }

    addOnMyTurnEndListener(handler: () => void) {
        this.onMyTurnEndListeners.push(handler)
    }

    addOnTurnMissedListener(handler: () => void) {
        this.onTurnMissedListeners.push(handler)
    }

    addOnGiveCardsListener(handler: () => void) {
        this.onGiveCardsListeners.push(handler)
    }

    addOnEnvidoPlayedListener(handler: (isAccepted: boolean) => void) {
        this.onEnvidoPlayedListeners.push(handler)
    }

    addOnTrucoDeniedListener(handler: (IDeny:boolean) => void) {
        this.onTrucoDeniedListeners.push(handler)
    }

    addOnOpponentPlayCardListener(handler: (card: Card) => void) {
        this.onOpponentPlayCardListeners.push(handler)
    }

    addOnMyPlayCardListener(handler: (card: Card) => void) {
        this.onMyPlayCardListeners.push(handler)
    }

    addOnTrucoPointCalculationListener(handler: (amIWinner: number) => void) {
        this.onTrucoPointCalculationListeners.push(handler)
    }

    addOnTrucoWinnerListener(handler: (IWon: boolean) => void) {
        this.onTrucoWinnerListeners.push(handler)
    }

    addOnMyEnvidoPlayedListener(handler: (isAccepted: boolean) => void) {
        this.onMyEnvidoPlayedListeners.push(handler)
    }

    addOnGetCardsListener(handler: (cards: Card[]) => void) {
        this.onGetCardsListeners.push(handler)
    }

    addOnMyTurnStartListener(handler: () => void) {
        this.onMyTurnStartListeners.push(handler)
    }

    addOnFinishFirstTurnListener(handler: () => void) {
        this.onFinishFirstTurnListeners.push(handler)
    }

    triggerOnMatchFound(opponentName: string) {
        this.onMatchFoundListeners.forEach(listener => listener(opponentName))
    }

    triggerOnJoiningLobby(opponentName: string) {
        this.onJoiningLobbyListeners.forEach(listener => listener(opponentName))
    }

    triggerOnGameStart() {
        this.onGameStartListeners.forEach(listener => listener())
    }

    triggerOnOpponentFinishTurn(gameActionMessage: GameActionMessage) {
        this.onOpponentFinishTurnListeners.forEach(listener => listener(gameActionMessage))
    }

    triggerOnMyTurnEnd() {
        this.onMyTurnEndListeners.forEach(listener => listener())
    }

    triggerOnTurnMissed() {
        this.onTurnMissedListeners.forEach(listener => listener())
    }

    triggerOnGiveCards() {
        this.onGiveCardsListeners.forEach(listener => listener())
    }

    triggerOnEnvidoPlayed(isAccepted: boolean) {
        this.onEnvidoPlayedListeners.forEach(listener => listener(isAccepted))
    }

    triggerOnMyEnvidoPlayed(isAccepted: boolean) {
        this.onMyEnvidoPlayedListeners.forEach(listener => listener(isAccepted))
    }

    triggerOnTrucoDenied(iDeny: boolean) {
        this.onTrucoDeniedListeners.forEach(listener => listener(iDeny))
    }

    triggerOnOpponentPlayCard(card: Card) {
        this.onOpponentPlayCardListeners.forEach(listener => listener(card))
    }

    triggerOnMyPlayCard(card: Card) {
        this.onMyPlayCardListeners.forEach(listener => listener(card))
    }

    triggerOnTrucoPointCalculation(amIWinner: number) {
        this.onTrucoPointCalculationListeners.forEach(listener => listener(amIWinner))
    }

    triggerOnTrucoWinner(IWon: boolean) {
        this.onTrucoWinnerListeners.forEach(listener => listener(IWon))
    }

    triggerOnGetCards(cards: Card[]) {
        this.onGetCardsListeners.forEach(listener => listener(cards))
    }

    triggerOnMyTurnStart() {
        this.onMyTurnStartListeners.forEach(listener => listener())
    }

    triggerOnFinishFirstTurn() {
        this.onFinishFirstTurnListeners.forEach(listener => listener())
    }

    static getInstance(): GameEventsManager {
        if (!GameEventsManager.instance) {
            GameEventsManager.instance = new GameEventsManager()
        }
        return GameEventsManager.instance
    }

}