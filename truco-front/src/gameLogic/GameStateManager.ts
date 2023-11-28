import CardsManager from "./CardsManager"

export default class GameStateManager{
    private myPoints: number
    private opponentPoints: number
    private cardsManager: CardsManager
    private myTurn: boolean
    private myTrucoPoints: number
    private opponentTrucoPoints: number

    constructor(){
        this.myPoints = 0
        this.opponentPoints = 0
        this.myTurn = false
        this.myTrucoPoints = 0
        this.opponentTrucoPoints = 0
        this.cardsManager = new CardsManager()
    }

    //TODO
}