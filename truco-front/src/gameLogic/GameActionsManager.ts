import { Card } from "./Cards/Card";
import GameEventsManager from "./GameEventsManager";
import { GameAction, getEnvidoPoints, getTrucoPoints, isEnvidoAction, isResponseAction, isTrucoAction, isTurnAction, getPrintableAction } from "./type/GameAction";
import { GameActionMessage } from "./type/GameActionMessage";
import { toast } from "react-toastify"

/* 
Local triggers:
    - OnEnvidoPlayed
    - OnTrucoPlayed
*/

export default class GameActionsManager {
    private lastActionMessage: GameActionMessage | null
    private calledAction: GameAction
    private lastAction: GameAction;
    private response: GameAction.QUIERO | GameAction.NO_QUIERO | GameAction.NONE
    private isEnvidoPhase: boolean
    private possibleActions: Map<GameAction, boolean>
    private gameEventsManager: GameEventsManager
    private trucoAccumulated: number
    private envidoAccumulated: number
    private toTrigger: Function | null;

    constructor() {
        this.calledAction = GameAction.NONE
        this.lastAction = GameAction.NONE
        this.lastActionMessage = null
        this.trucoAccumulated = 1
        this.envidoAccumulated = 0
        this.response = GameAction.NONE
        this.isEnvidoPhase = true
        this.toTrigger = null
        this.possibleActions = new Map<GameAction, boolean>()
        this.resetPossibleActions()
        this.gameEventsManager = GameEventsManager.getInstance()
    }

    public getPossibleActions(): Map<GameAction, boolean> {
        return this.possibleActions
    }


    public getCalledAction(): GameAction {
        return this.calledAction
    }

    public getTrucoAccum(): number {
        return this.trucoAccumulated
    }

    public getEnvidoAccum(): number {
        return this.envidoAccumulated
    }

    public getLastAction(): GameAction {
        return this.lastAction
    }

    public lateTrigger() {
        if (this.toTrigger !== null) {
            const trigger = this.toTrigger.bind(this)
            this.toTrigger = null
            trigger()
        }
    }

    public handleAction(actionMessage: GameActionMessage, iCalled: boolean = false) {
        if(!iCalled && actionMessage.action !== GameAction.PLACE_CARD && actionMessage.action !== GameAction.NONE){
            toast(getPrintableAction(actionMessage.action))
        }
        this.lastActionMessage = actionMessage
        const action = actionMessage.action
        if(action === GameAction.NONE){
            return;
        }
        if(isResponseAction(action)){
            this.response = action as GameAction.QUIERO | GameAction.NO_QUIERO
            this.handleResponseAction(iCalled)
            return;
        }
        this.response = GameAction.NONE
        if(isTurnAction(action)){
            this.lastAction = this.calledAction
            this.calledAction = action
            this.handleTurnAction(iCalled)
            return;
        }
        if(isEnvidoAction(action)){
            this.lastAction = this.calledAction
            this.calledAction = action
            this.handleEnvidoAction()
        }else if(isTrucoAction(action)){
            this.lastAction = this.calledAction
            this.calledAction = action
            this.handleTrucoAction(iCalled)
        }
        this.disableLastAction()
    }

    private handleResponseAction(iCalled:boolean) {
        this.disableResponseActions()
        this.finishEnvidoPhase();

        if (isTrucoAction(this.calledAction)) {
            if(this.response === GameAction.QUIERO)this.addTrucoPoints()
            this.possibleActions.set(GameAction.CALL_ENVIDO_VA_PRIMERO, false)
            this.toTrigger = () =>this.gameEventsManager.triggerOnTrucoResponse(this.response === GameAction.QUIERO, iCalled)
        }
        if (isEnvidoAction(this.calledAction)) {
            if(this.response === GameAction.QUIERO)this.addEnvidoPoints()
            this.possibleActions.set(GameAction.CALL_TRUCO, true)
            this.toTrigger = () =>this.gameEventsManager.triggerOnEnvidoPlayed(this.response === GameAction.QUIERO, iCalled)
        }
        this.possibleActions.set(GameAction.PLACE_CARD, true)
    }

    private handleTurnAction(iCalled:boolean) {
        if(this.calledAction === GameAction.IR_AL_MAZO){
            this.toTrigger = () =>this.gameEventsManager.triggerOnIrAlMazo(iCalled,this.isEnvidoPhase)
        }
        if(this.calledAction === GameAction.PLACE_CARD){
            this.disableResponseActions();
            this.toTrigger = () =>this.gameEventsManager.triggerOnCardPlayed(iCalled, this.lastActionMessage?.payload.card as Card)
        }
    }

    private handleTrucoAction(iCalled: boolean) {
        this.disableEnvidoActions()
        this.enableResponseActions()
        this.disablePlayCard()
        this.addTrucoPoints(this.lastAction)
        if (this.calledAction === GameAction.CALL_TRUCO) {
            this.possibleActions.set(GameAction.CALL_RETRUCO, !iCalled)
            if (this.isEnvidoPhase && !this.wasEnvidoPlayed()) this.possibleActions.set(GameAction.CALL_ENVIDO_VA_PRIMERO, !iCalled)
        } else if (this.calledAction === GameAction.CALL_RETRUCO) {
            this.finishEnvidoPhase();
            this.possibleActions.set(GameAction.CALL_VALE4, !iCalled)
        }
    }

    private addTrucoPoints(action: GameAction = this.calledAction){
        this.trucoAccumulated = getTrucoPoints(action)
    }

    private handleEnvidoAction() {
        this.disableTrucoActions()
        this.enableResponseActions()
        this.disablePlayCard()
        this.addEnvidoPoints(this.lastAction)
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
    private addEnvidoPoints(action: GameAction = this.calledAction){
        this.envidoAccumulated += getEnvidoPoints(action)
    }

    public finishEnvidoPhase() {
        this.isEnvidoPhase = false
        this.disableEnvidoActions()
    }

    private disablePlayCard() {
        this.possibleActions.set(GameAction.PLACE_CARD, false)
    }

    private wasEnvidoPlayed() {
        return this.envidoAccumulated !== 0
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
        this.possibleActions.set(GameAction.QUIERO, true)
        this.possibleActions.set(GameAction.NO_QUIERO, true)
    }

    private disableResponseActions() {
        this.possibleActions.set(GameAction.QUIERO, false)
        this.possibleActions.set(GameAction.NO_QUIERO, false)
    }

    public resetPossibleActions() {
        this.possibleActions.set(GameAction.CALL_ENVIDO, true)
        this.possibleActions.set(GameAction.CALL_ENVIDO_ENVIDO, false)
        this.possibleActions.set(GameAction.CALL_REAL_ENVIDO, true)
        this.possibleActions.set(GameAction.CALL_FALTA_ENVIDO, true)
        this.possibleActions.set(GameAction.CALL_ENVIDO_VA_PRIMERO, false)
        this.possibleActions.set(GameAction.CALL_TRUCO, true)
        this.possibleActions.set(GameAction.CALL_RETRUCO, false)
        this.possibleActions.set(GameAction.CALL_VALE4, false)
        this.possibleActions.set(GameAction.QUIERO, false)
        this.possibleActions.set(GameAction.NO_QUIERO, false)
        this.possibleActions.set(GameAction.PLACE_CARD, true)
        this.possibleActions.set(GameAction.IR_AL_MAZO, true)
    }

    public restart() {
        this.calledAction = GameAction.NONE
        this.lastAction = GameAction.NONE
        this.lastActionMessage = null
        this.trucoAccumulated = 1
        this.envidoAccumulated = 0
        this.response = GameAction.NONE
        this.isEnvidoPhase = true
        this.toTrigger = null
        this.resetPossibleActions()
    }

}