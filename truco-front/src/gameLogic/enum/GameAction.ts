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