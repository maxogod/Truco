import { GameAction } from "./GameAction"

export class  GameActionMessage{
    action: GameAction
    payload: any
    constructor(action: GameAction, payload: any){
        this.action = action
        this.payload = payload
    }
}