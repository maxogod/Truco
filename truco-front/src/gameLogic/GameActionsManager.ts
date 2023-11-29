import GameEventsManager from "./GameEventsManager";
import { GameAction, getEnvidoPoints, getTrucoPoints, isEnvidoAction, isResponseAction, isTrucoAction } from "./type/GameAction";
import { GameActionMessage } from "./type/GameActionMessage";

/* 
Local triggers:
    - OnEnvidoPlayed
    - OnTrucoPlayed
*/

export default class GameActionsManager {
    private calledAction: GameAction
    private lastAction: GameAction;
    private response: GameAction.ACCEPTED | GameAction.DENIED | GameAction.NONE
    private isFirstTurn: boolean
    private possibleActions: Map<GameAction, boolean>
    private gameEventsManager: GameEventsManager
    private trucoAccumulated: number
    private envidoAccumulated: number

    constructor() {
        this.calledAction = GameAction.NONE
        this.lastAction = GameAction.NONE
        this.trucoAccumulated = 1
        this.envidoAccumulated = 1
        this.response = GameAction.NONE
        this.isFirstTurn = true
        this.possibleActions = new Map<GameAction, boolean>()
        this.resetPossibleActions()
        this.gameEventsManager = GameEventsManager.getInstance()
    }

    public getPossibleActions(): Map<GameAction, boolean> {
        return this.possibleActions
    }

    public processMyAction(action: GameActionMessage) {
        if(action.action === GameAction.PLACE_CARD){
            this.gameEventsManager.triggerOnMyPlayCard(action.payload.card)
        }
        if (isResponseAction(action.action)) {
            if (isTrucoAction(this.calledAction)) {
                if (action.action === GameAction.DENIED) {
                    this.gameEventsManager.triggerOnTrucoDenied(true)
                }
            }
            this.possibleActions.set(GameAction.PLACE_CARD, true)
        }else{
            this.setLastAction(action.action)
        }
    }

    public resetPossibleActions() {
        this.calledAction = GameAction.NONE
        this.lastAction = GameAction.NONE
        this.response = GameAction.NONE
        this.isFirstTurn = true
        this.trucoAccumulated = 1
        this.envidoAccumulated = 1
        this.possibleActions.set(GameAction.CALL_ENVIDO, true)
        this.possibleActions.set(GameAction.CALL_ENVIDO_ENVIDO, false)
        this.possibleActions.set(GameAction.CALL_REAL_ENVIDO, true)
        this.possibleActions.set(GameAction.CALL_FALTA_ENVIDO, true)
        this.possibleActions.set(GameAction.CALL_ENVIDO_VA_PRIMERO, false)
        this.possibleActions.set(GameAction.CALL_TRUCO, true)
        this.possibleActions.set(GameAction.CALL_RETRUCO, false)
        this.possibleActions.set(GameAction.CALL_VALE4, false)
        this.possibleActions.set(GameAction.ACCEPTED, false)
        this.possibleActions.set(GameAction.DENIED, false)
        this.possibleActions.set(GameAction.PLACE_CARD, true)
    }

    public setLastAction(action: GameAction) {
        if (isResponseAction(action)) {
            this.response = action as GameAction.ACCEPTED | GameAction.DENIED
            this.updatePossibleActions(true)
        } else {
            if(isTrucoAction(action)) this.trucoAccumulated = getTrucoPoints(action)
            if(isEnvidoAction(action)) this.envidoAccumulated += getEnvidoPoints(action)
            this.response = GameAction.NONE
            this.lastAction = this.calledAction
            this.calledAction = action
            this.updatePossibleActions()
        }
    }

    public finishFirstTurn() {
        this.isFirstTurn = false
        this.disableEnvidoActions()
    }

    public getCalledAction(): GameAction {
        return this.calledAction
    }

    public getTrucoAccum(denied:boolean = false): number {
        return !denied?this.trucoAccumulated:getTrucoPoints(this.lastAction) 
    }

    public getEnvidoAccum(denied:boolean = false): number {
        return !denied?this.envidoAccumulated:this.envidoAccumulated - getEnvidoPoints(this.calledAction)
    }

    public getLastAction(): GameAction {
        return this.lastAction
    }

    private updatePossibleActions(isResponse: boolean = false) {
        if (this.calledAction === GameAction.PLACE_CARD) {
            this.disableEnvidoActions()
            this.disableResponseActions()
            return
        }
        this.disableLastAction()
        if (isResponse) {
            this.disableResponseActions()
        } else {
            this.response = GameAction.NONE
            this.enableResponseActions()
        }
        if (isTrucoAction(this.calledAction)) {
            if (isResponse) {
                if (this.response === GameAction.DENIED){
                    this.gameEventsManager.triggerOnTrucoDenied(false)
                    return;
                }
                this.disableTrucoActions()
                this.possibleActions.set(GameAction.PLACE_CARD, true)
                this.possibleActions.set(GameAction.CALL_ENVIDO_VA_PRIMERO, false)
                return;
            }
            this.possibleActions.set(GameAction.PLACE_CARD, false)
            this.disableEnvidoActions()
            if (this.calledAction === GameAction.CALL_TRUCO) {
                this.possibleActions.set(GameAction.CALL_RETRUCO, true)
                if (this.isFirstTurn && this.envidoAccumulated === 1) this.possibleActions.set(GameAction.CALL_ENVIDO_VA_PRIMERO, true)
            } else if (this.calledAction === GameAction.CALL_RETRUCO) {
                this.possibleActions.set(GameAction.CALL_VALE4, true)
            }
        }

        if (isEnvidoAction(this.calledAction) && this.isFirstTurn) {
            if (isResponse) {
                this.finishFirstTurn();
                this.possibleActions.set(GameAction.CALL_TRUCO, true)
                this.possibleActions.set(GameAction.PLACE_CARD, true)
                this.gameEventsManager.triggerOnEnvidoPlayed(this.response === GameAction.ACCEPTED)
                return;
            }
            this.disableTrucoActions()
            this.possibleActions.set(GameAction.PLACE_CARD, false)
            if (this.calledAction === GameAction.CALL_ENVIDO) {
                this.possibleActions.set(GameAction.CALL_ENVIDO_ENVIDO, true)
                this.possibleActions.set(GameAction.CALL_REAL_ENVIDO, true)
                this.possibleActions.set(GameAction.CALL_FALTA_ENVIDO, true)
            } else if (this.calledAction === GameAction.CALL_REAL_ENVIDO) {
                this.possibleActions.set(GameAction.CALL_ENVIDO, false)
                this.possibleActions.set(GameAction.CALL_ENVIDO_ENVIDO, false)
            } else if (this.calledAction === GameAction.CALL_FALTA_ENVIDO) {
                this.possibleActions.set(GameAction.CALL_ENVIDO, false)
                this.possibleActions.set(GameAction.CALL_ENVIDO_ENVIDO, false)
                this.possibleActions.set(GameAction.CALL_REAL_ENVIDO, false)
            } else if (this.calledAction === GameAction.CALL_ENVIDO_VA_PRIMERO) {
                this.possibleActions.set(GameAction.CALL_ENVIDO_ENVIDO, true)
                this.possibleActions.set(GameAction.CALL_REAL_ENVIDO, true)
                this.possibleActions.set(GameAction.CALL_FALTA_ENVIDO, true)
            }
        }
    }


    private disableTrucoActions() {
        this.possibleActions.set(GameAction.CALL_TRUCO, false)
        this.possibleActions.set(GameAction.CALL_RETRUCO, false)
        this.possibleActions.set(GameAction.CALL_VALE4, false)
    }

    private disableEnvidoActions() {
        this.possibleActions.set(GameAction.CALL_ENVIDO, false)
        this.possibleActions.set(GameAction.CALL_ENVIDO_ENVIDO, false)
        this.possibleActions.set(GameAction.CALL_REAL_ENVIDO, false)
        this.possibleActions.set(GameAction.CALL_FALTA_ENVIDO, false)
        this.possibleActions.set(GameAction.CALL_ENVIDO_VA_PRIMERO, false)
    }

    private disableLastAction() {
        this.possibleActions.set(this.calledAction, false)
    }

    private enableResponseActions() {
        this.possibleActions.set(GameAction.ACCEPTED, true)
        this.possibleActions.set(GameAction.DENIED, true)
    }

    private disableResponseActions() {
        this.possibleActions.set(GameAction.ACCEPTED, false)
        this.possibleActions.set(GameAction.DENIED, false)
    }

}