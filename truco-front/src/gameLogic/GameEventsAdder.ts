import { Card } from "./Cards/Card"
import GameEventsManager from "./GameEventsManager"
import { GameActionMessage } from "./type/GameActionMessage"

export default class GameEventsAdder{
    gameEventsManager: GameEventsManager

    constructor(){
        this.gameEventsManager = GameEventsManager.getInstance()
    }

    public addMatchFoundListener(handler: (opponentName: string) => void) {
        this.gameEventsManager.addOnMatchFoundListener(handler)
        this.gameEventsManager.addOnJoiningLobbyListener(handler)
    }

    public addOnGameStartListener(handler: () => void) {
        this.gameEventsManager.addOnGameStartListener(handler)
    }

    public addOnOpponentFinishTurnListener(handler: (gameActionMessage: GameActionMessage) => void) {
        this.gameEventsManager.addOnOpponentFinishTurnListener(handler)
    }

    public addOnMyTurnEndListener(handler: () => void) {
        this.gameEventsManager.addOnMyTurnEndListener(handler)
    }

    public addOnGetCardsListener(handler: (cards: Card[]) => void) {
        this.gameEventsManager.addOnGetCardsListener(handler)
    }

    public addOnMyTurnStartListener(handler: () => void) {
        this.gameEventsManager.addOnMyTurnStartListener(handler)
    }

    public addOnMyPlayCardListener(handler: (card: Card) => void) {
        this.gameEventsManager.addOnMyPlayCardListener(handler)
    }
}