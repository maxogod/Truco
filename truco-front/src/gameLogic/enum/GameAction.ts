export enum GameAction{
    CALL_ENVIDO = "call-envido",
    CALL_ENVIDO_ENVIDO = "call-envido-envido",
    CALL_REAL_ENVIDO = "call-real-envido",
    CALL_FALTA_ENVIDO = "call-falta-envido",
    CALL_ENVIDO_VA_PRIMERO = "call-envido-va-primero",
    CALL_TRUCO = "call-truco",
    CALL_RETRUCO = "call-retruco",
    CALL_VALE4 = "call-vale4",
    ACCEPTED = "accepted",
    DENIED = "denied",
    PLACE_CARD = "place-card",
    NONE = "none"
}

export interface GameActionMessage{
    action: GameAction
    payload: any
}

export const isResponseAction = (action: GameAction): boolean => {
    return action === GameAction.ACCEPTED || action === GameAction.DENIED
}

export const isTrucoAction = (action: GameAction): boolean => {
    return action === GameAction.CALL_TRUCO || action === GameAction.CALL_RETRUCO || action === GameAction.CALL_VALE4
}

export const isEnvidoAction = (action: GameAction): boolean => {
    return action === GameAction.CALL_ENVIDO || action === GameAction.CALL_ENVIDO_ENVIDO ||
        action === GameAction.CALL_REAL_ENVIDO || action === GameAction.CALL_FALTA_ENVIDO ||
        action === GameAction.CALL_ENVIDO_VA_PRIMERO
}