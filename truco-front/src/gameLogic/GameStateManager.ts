import { Card } from "./Cards/Card"
import GameEventsManager from "./GameEventsManager"
import { GameAction, getEnvidoPoints, getTrucoPoints } from "./type/GameAction"

export default class GameStateManager{
    private myPoints: number
    private opponentPoints: number
    private myTurn: boolean
    private myTrucoPoints: number
    private opponentTrucoPoints: number
    private imHand: boolean
    private pardas: number
    private firstTurnPoint: number
    private roundEnded: boolean
    private gameEventsManager: GameEventsManager

    constructor(){
        this.myPoints = 0
        this.opponentPoints = 0
        this.myTurn = false
        this.myTrucoPoints = 0
        this.opponentTrucoPoints = 0
        this.imHand = false
        this.pardas = 0
        this.roundEnded = false
        this.firstTurnPoint = 0
        this.gameEventsManager = GameEventsManager.getInstance()
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

    public setOpponentTurn(){
        this.myTurn = false
    }

    public envidoPlayed(opponentEnvidoPoints: number, myEnvidoPoints: number,): boolean{
        // returns true if opponent wins
        console.log(this.imHand)
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
        console.log("myTrucoPoints: " + this.myTrucoPoints)
        console.log("opponentTrucoPoints: " + this.opponentTrucoPoints)
        console.log("pardas: " + this.pardas)
        this.checkTrucoWinner()
    }

    private checkTrucoWinner(){
        let roundEnded = false
        let IWon = false
        if(this.pardas > 0 && (this.myTrucoPoints !== 0 || this.opponentTrucoPoints !== 0)){
            roundEnded = true
            IWon = (this.myTrucoPoints + this.firstTurnPoint) > this.opponentTrucoPoints
        }else if(this.myTrucoPoints === 2){
            roundEnded = true
            IWon = true
        }else if(this.opponentTrucoPoints === 2){
            roundEnded = true
            IWon = false
        }
        this.roundEnded = roundEnded
        if(roundEnded){
            this.myTrucoPoints = 0
            this.opponentTrucoPoints = 0
            this.pardas = 0
            this.firstTurnPoint = 0
            console.log("ENDED ROUND")
            console.log("IWon: " + IWon)
            this.gameEventsManager.triggerOnTrucoWinner(IWon)
        }
    }

    public givePoints(toMe:boolean, points: number){
        if(toMe)this.myPoints += points
        else this.opponentPoints += points
        console.log("GLOBAL POINTS")
        console.log("myPoints: " + this.myPoints)
        console.log("opponentPoints: " + this.opponentPoints)
    }
    
}