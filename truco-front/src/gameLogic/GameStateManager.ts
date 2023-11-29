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
    private gameEventsManager: GameEventsManager


    constructor(){
        this.myPoints = 0
        this.opponentPoints = 0
        this.myTurn = false
        this.myTrucoPoints = 0
        this.opponentTrucoPoints = 0
        this.imHand = false
        this.pardas = 0
        this.gameEventsManager = GameEventsManager.getInstance()
    }

    public setMyTurn(){
        this.myTurn = true
    }

    public setImHand(){
        this.imHand = true
    }

    public setOpponentTurn(){
        this.myTurn = false
    }

    public envidoPlayed(opponentEnvidoPoints: number, myEnvidoPoints: number,): boolean{
        // returns true if opponent wins
        return opponentEnvidoPoints === myEnvidoPoints? !this.imHand : opponentEnvidoPoints > myEnvidoPoints
    }

    public envidoEnded(Iwon: boolean, calledAction: GameAction){
        if(Iwon){
            this.myPoints += getEnvidoPoints(calledAction)
        }else{
            this.opponentPoints += getEnvidoPoints(calledAction)
        }
    }

    public trucoPointCalculation(Iwon: number){
        switch(Iwon){
            case -1:
                this.opponentTrucoPoints += 1
                break;
            case 0:
                this.pardas += 1
                break;
            case 1:
                this.myTrucoPoints += 1
                break;
        }
        this.checkTrucoWinner()
    }

    private checkTrucoWinner(){
        let gameEnded = false
        let IWon = false
        if(this.pardas > 0 && this.myTrucoPoints !== this.opponentTrucoPoints){
            gameEnded = true
            IWon = this.myTrucoPoints > this.opponentTrucoPoints
        }else if(this.myTrucoPoints === 2){
            gameEnded = true
            IWon = true
        }else if(this.opponentTrucoPoints === 2){
            gameEnded = true
            IWon = false
        }
        if(gameEnded){
            this.gameEventsManager.triggerOnTrucoWinner(IWon)
        }
    }

    public givePoints(toMe:boolean, calledAction: GameAction){
        if(toMe)this.myPoints += getTrucoPoints(calledAction)
        else this.opponentPoints += getTrucoPoints(calledAction)
    }
    

    //TODO
}