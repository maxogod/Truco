export enum GameAction {
    CALL_ENVIDO = "call-envido",
    CALL_ENVIDO_ENVIDO = "call-envido-envido",
    CALL_REAL_ENVIDO = "call-real-envido",
    CALL_FALTA_ENVIDO = "call-falta-envido",
    CALL_ENVIDO_VA_PRIMERO = "call-envido-va-primero",
    CALL_TRUCO = "call-truco",
    CALL_RETRUCO = "call-retruco",
    CALL_VALE4 = "call-vale4",
    QUIERO = "quiero",
    NO_QUIERO = "no-quiero",
    PLACE_CARD = "place-card",
    IR_AL_MAZO = "ir-al-mazo",
    SURRENDER = "surrender",
    NONE = "none"
}

export const getEnvidoPoints = (action: GameAction): number => {
    if (action === GameAction.CALL_ENVIDO) return 2
    if (action === GameAction.CALL_ENVIDO_ENVIDO) return 2
    if (action === GameAction.CALL_REAL_ENVIDO) return 3
    if (action === GameAction.CALL_FALTA_ENVIDO) return 15
    if (action === GameAction.CALL_ENVIDO_VA_PRIMERO) return 2
    return 0
}

export const getTrucoPoints = (action: GameAction): number => {
    if (action === GameAction.CALL_TRUCO) return 2
    if (action === GameAction.CALL_RETRUCO) return 3
    if (action === GameAction.CALL_VALE4) return 4
    return 1
}

export const isResponseAction = (action: GameAction): boolean => {
    return action === GameAction.QUIERO || action === GameAction.NO_QUIERO
}

export const isTrucoAction = (action: GameAction): boolean => {
    return action === GameAction.CALL_TRUCO || action === GameAction.CALL_RETRUCO || action === GameAction.CALL_VALE4
}

export const isEnvidoAction = (action: GameAction): boolean => {
    return action === GameAction.CALL_ENVIDO || action === GameAction.CALL_ENVIDO_ENVIDO ||
        action === GameAction.CALL_REAL_ENVIDO || action === GameAction.CALL_FALTA_ENVIDO ||
        action === GameAction.CALL_ENVIDO_VA_PRIMERO
}

export const isTurnAction = (action: GameAction): boolean => {
    return action === GameAction.PLACE_CARD || action === GameAction.IR_AL_MAZO
}

export const getPrintableAction = (action: GameAction): string => {
    const random = Math.floor(Math.random()*3);
    if (action === GameAction.CALL_ENVIDO) return ["Envido", "Te canto Envido", "Envido Querés?"][random]
    if (action === GameAction.CALL_ENVIDO_ENVIDO) return ["Envido", "No se juega con Envido?", "Envido te suena?"][random]
    if (action === GameAction.CALL_REAL_ENVIDO) return "Real Envido"
    if (action === GameAction.CALL_FALTA_ENVIDO) return "Falta Envido!!"
    if (action === GameAction.CALL_ENVIDO_VA_PRIMERO) return ["El Envido va Primero", "...Falta algo aca, ENVIDO", "Te estás olvidando del Envido!"][random]
    if (action === GameAction.CALL_TRUCO) return ["Truco", "Te canto Truco!", "¡¡TRUCO!!"][random]
    if (action === GameAction.CALL_RETRUCO) return ["Quiero Retruco", "Retruco!!", "Te bancás un Retruco?"][random]
    if (action === GameAction.CALL_VALE4) return "¡Quiero vale 4!"
    if (action === GameAction.QUIERO) return ["Pero más vale que Quiero", "¡¡¡QUIERO!!!", "Quiero!"][random]
    if (action === GameAction.NO_QUIERO) return ["No Quiero!", "Mejor No Quiero", "Me achico, No Quiero"][random]
    if (action === GameAction.PLACE_CARD) return "Juego carta"
    if (action === GameAction.IR_AL_MAZO) return "Me voy al Mazo"
    if (action === GameAction.SURRENDER) return "Me rindo"
    return "None"
}