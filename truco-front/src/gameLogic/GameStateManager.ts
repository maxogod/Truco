import GameEventsManager from "./GameEventsManager"

export default class GameStateManager{
    private myPoints: number
    private opponentPoints: number
    private myTurn: boolean
    private iPlayCard: boolean;
    private myTrucoPoints: number
    private opponentTrucoPoints: number
    private imHand: boolean
    private pardas: number
    private firstTurnPoint: number
    private roundEnded: boolean
    private gameEventsManager: GameEventsManager

    constructor(){
        this.myTurn = false
        this.imHand = false
        this.roundEnded = false
        this.iPlayCard = false
        this.myPoints = 0
        this.opponentPoints = 0
        this.myTrucoPoints = 0
        this.opponentTrucoPoints = 0
        this.pardas = 0
        this.firstTurnPoint = 0
        this.gameEventsManager = GameEventsManager.getInstance()
    }

    public restart(){
        this.myPoints = 0
        this.opponentPoints = 0
        this.myTrucoPoints = 0
        this.opponentTrucoPoints = 0
        this.pardas = 0
        this.firstTurnPoint = 0
        this.myTurn = false
        this.imHand = false
        this.roundEnded = false
        this.iPlayCard = false
    }

    public isMyTurn(): boolean{
        return this.myTurn
    }

    public setMyTurn(){
        this.myTurn = true
    }

    public setImHand(){
        this.imHand = true
    }

    public setImNotHand(){
        this.imHand = false
    }

    public amIHand(): boolean{
        return this.imHand
    }

    public startNewRound(){
        this.roundEnded = false
    }

    public isRoundEnded(): boolean{
        return this.roundEnded
    }

    public setRoundEnded(){
        this.roundEnded = true
    }

    public setOpponentTurn(){
        this.myTurn = false
    }

    public setIPlayCard(){
        this.iPlayCard = true
    }

    public setOppoentPlaysCard(){
        this.iPlayCard = false
    }

    public isNewRound(): boolean{
        return this.myTrucoPoints === 0 && this.opponentTrucoPoints === 0 && this.pardas === 0
    }

    public doIPlayCard(): boolean{
        return this.iPlayCard
    }

    public onRoundStartImHand(){
        this.setMyTurn()
        this.setImHand()
        this.setIPlayCard()
        this.startNewRound()
        this.resetRoundPoints()
    }

    public onRoundStartOpponentIsHand(){
        this.setOpponentTurn()
        this.setImNotHand()
        this.setOppoentPlaysCard()
        this.startNewRound()
        this.resetRoundPoints()
    }

    private resetRoundPoints(){
        this.myTrucoPoints = 0
        this.opponentTrucoPoints = 0
        this.pardas = 0
        this.firstTurnPoint = 0
    }

    public envidoPlayed(opponentEnvidoPoints: number, myEnvidoPoints: number,): boolean{
        // returns true if opponent wins
        return opponentEnvidoPoints === myEnvidoPoints? !this.imHand : (opponentEnvidoPoints > myEnvidoPoints)
    }

    public trucoPointCalculation(Iwon: number){
        const isFirstTurn = this.opponentTrucoPoints === 0 && this.myTrucoPoints === 0 && this.pardas === 0
        switch(Iwon){
            case -1:
                this.opponentTrucoPoints += 1
                if(isFirstTurn)this.firstTurnPoint = -1
                break;
            case 0:
                this.pardas += 1
                break;
            case 1:
                if(isFirstTurn)this.firstTurnPoint = 1
                this.myTrucoPoints += 1
                break;
        }
        this.checkTrucoWinner()
    }

    private checkTrucoWinner() {
        let IWon = false
        if (this.pardas > 0 && (this.myTrucoPoints !== 0 || this.opponentTrucoPoints !== 0)) {
            this.setRoundEnded()
            IWon = (this.myTrucoPoints + this.firstTurnPoint) > this.opponentTrucoPoints
        } else if (this.myTrucoPoints === 2) {
            this.setRoundEnded()
            IWon = true
        } else if (this.opponentTrucoPoints === 2) {
            this.setRoundEnded()
            IWon = false
        }
        if (this.isRoundEnded()) {
            this.resetRoundPoints()
            this.gameEventsManager.triggerOnTrucoWinner(IWon)
        }
    }

    private limitPoints(){
        this.myPoints = Math.min(this.myPoints, 15)
        this.opponentPoints = Math.min(this.opponentPoints, 15)
    }

    public givePoints(toMe:boolean, points: number){
        points = points || 1
        if(toMe)this.myPoints += points
        else this.opponentPoints += points

        this.limitPoints()
        this.gameEventsManager.triggerOnPointsUpdate(this.myPoints, this.opponentPoints)
        if(this.myPoints >= 15 || this.opponentPoints >= 15){
            this.gameEventsManager.triggerOnGameEnd(this.myPoints > this.opponentPoints)
        }
    }
    
}