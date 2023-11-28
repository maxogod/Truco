import { GameAction } from "./enum/GameAction";

export default class GameState {
    private calledAction: GameAction
    private lastAction: GameAction;
    private isFirstTurn: boolean
    private possibleActions: Map<GameAction, boolean>

    constructor() {
        this.calledAction = GameAction.NONE
        this.lastAction = GameAction.NONE
        this.isFirstTurn = true
        this.possibleActions = new Map<GameAction, boolean>()
        this.resetPossibleActions()
    }

    public getPossibleActions(): Map<GameAction, boolean> {
        return this.possibleActions
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
        this.possibleActions.set(GameAction.ACCEPTED, false)
        this.possibleActions.set(GameAction.DENIED, false)
        this.possibleActions.set(GameAction.PLACE_CARD, true)
    }

    public setLastAction(action: GameAction) {
        if (this.isResponseAction(action)) {
            this.updatePossibleActions(true)
        } else {
            this.lastAction = this.calledAction
            this.calledAction = action
            this.updatePossibleActions()
        }
    }

    public finishFirstTurn() {
        this.isFirstTurn = false
        this.disableEnvidoActions()
    }

    private isResponseAction(action: GameAction): boolean {
        return action === GameAction.ACCEPTED || action === GameAction.DENIED || action === GameAction.NONE
    }

    private updatePossibleActions(isResponse: boolean = false) {
        this.disableLastAction()
        if (isResponse) {
            this.disableResponseActions()
        } else {
            this.enableResponseActions()
        }
        if (this.isTrucoAction(this.calledAction)) {
            if (isResponse) {
                this.possibleActions.set(GameAction.PLACE_CARD, true)
                return;
            }
            this.disableEnvidoActions()
            if (this.calledAction === GameAction.CALL_TRUCO) {
                this.possibleActions.set(GameAction.CALL_RETRUCO, true)
                if (this.isFirstTurn) this.possibleActions.set(GameAction.CALL_ENVIDO_VA_PRIMERO, true)
            } else if (this.calledAction === GameAction.CALL_RETRUCO) {
                this.possibleActions.set(GameAction.CALL_VALE4, true)
            }
        }

        if (this.isEnvidoAction(this.calledAction) && this.isFirstTurn) {
            if (isResponse) {
                this.finishFirstTurn();
                this.possibleActions.set(GameAction.CALL_TRUCO, true)
                return;
            }
            this.disableTrucoActions()
            if (this.calledAction === GameAction.CALL_ENVIDO) {
                this.possibleActions.set(GameAction.CALL_ENVIDO_ENVIDO, true)
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


    private isTrucoAction(action: GameAction): boolean {
        return action === GameAction.CALL_TRUCO || action === GameAction.CALL_RETRUCO || action === GameAction.CALL_VALE4
    }

    private isEnvidoAction(action: GameAction): boolean {
        return action === GameAction.CALL_ENVIDO || action === GameAction.CALL_ENVIDO_ENVIDO ||
            action === GameAction.CALL_REAL_ENVIDO || action === GameAction.CALL_FALTA_ENVIDO || action === GameAction.CALL_ENVIDO_VA_PRIMERO
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
        this.possibleActions.set(this.lastAction, false)
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