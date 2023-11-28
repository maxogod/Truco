import { GameActionMessage } from "./enum/GameAction"

export default class GameEventsManager{

    onMatchFound: (opponentName: string) => void = () => {}

    onGameStart: () => void = () => {}

    onOpponentFinishTurn: (gameActionMessage: GameActionMessage) => void = () => {}

    onMyTurnEnd: () => void = () => {}

    setOnMatchFound(handler: (opponentName: string) => void){
        this.onMatchFound = handler
    }

    setOnGameStart(handler: () => void){
        this.onGameStart = handler
    }

    setOnOpponentFinishTurn(handler: (gameActionMessage: GameActionMessage) => void){
        this.onOpponentFinishTurn = handler
    }

    setOnMyTurnEnd(handler: () => void){
        this.onMyTurnEnd = handler
    }

}