import User from "../@types/UserType"
import { Card } from "./Cards/Card"
import GameEventsManager from "./GameEventsManager"
import { GameActionMessage } from "./type/GameActionMessage"
import WatchListEvent from "./type/WatchListEvent"

export default class GameEventsAdder{
    gameEventsManager: GameEventsManager

    constructor(){
        this.gameEventsManager = GameEventsManager.getInstance()
    }

    public addMatchFoundListener(handler: (opponentName: string, opponentRating:number) => void) {
        this.gameEventsManager.addOnMatchFoundListener(handler)
        this.gameEventsManager.addOnJoiningLobbyListener(handler)
    }

    public addOnGameStartListener(handler: () => void) {
        this.gameEventsManager.addOnGameStartListener(handler)
    }

    public addOnOpponentActionListener(handler: (gameActionMessage: GameActionMessage) => void) {
        this.gameEventsManager.addOnOpponentActionListener(handler)
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

    public addOnCardPlayedListener(handler: (iCalled: boolean, card: Card) => void) {
        this.gameEventsManager.addOnCardPlayedListener(handler)
    }

    public addOnGameEndListener(handler: (IWon: boolean) => void) {
        this.gameEventsManager.addOnGameEndListener(handler)
    }

    public addOnPointsUpdateListener(handler: (myPoints: number, opponentPoints: number) => void) {
        this.gameEventsManager.addOnPointsUpdateListener(handler)
    }

    public addOnUpdateOnlineFriendsListener(handler: (watchlistEvent: WatchListEvent) => void) {
        this.gameEventsManager.addOnUpdateOnlineFriendsListener(handler)
    }

    public addOnFriendRequestListener(handler: (friendUser: User) => void) {
        this.gameEventsManager.addOnFriendRequestListener(handler)
    }

    public addOnFriendRequestAcceptedListener(handler: (friendUsername: string) => void) {
        this.gameEventsManager.addOnFriendRequestAcceptedListener(handler)
    }

    public addOnGameChallengeListener(handler: (data:{challengerName:string, challengerRating:number}) => void) {
        this.gameEventsManager.addOnGameChallengeListener(handler)
    }

}