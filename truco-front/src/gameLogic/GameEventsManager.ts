import { GameActionMessage } from "./enum/GameAction"

export default class GameEventsManager{

    onMatchFound: (opponentName: string) => void = () => {}

    onGameStart: () => void = () => {}

    onGetTurn: (gameActionMessage: GameActionMessage) => void = () => {}

    onMyTurnEnd: () => void = () => {}

    setOnMatchFound(handler: (opponentName: string) => void){
        this.onMatchFound = handler
    }

    setOnGameStart(handler: () => void){
        this.onGameStart = handler
    }

    setOnGetTurn(handler: (gameActionMessage: GameActionMessage) => void){
        this.onGetTurn = handler
    }

    setOnMyTurnEnd(handler: () => void){
        this.onMyTurnEnd = handler
    }

}