import { ReactNode, createContext, useState } from "react";
import { Card } from "../gameLogic/Cards/Card";
import GameManager from "../gameLogic/GameManager";
import { GameAction } from "../gameLogic/type/GameAction";

interface GameContextType {
    gameManager: GameManager
    opponentName: string
    setOpponentName: (name: string) => void
    isMyTurn: boolean
    setIsMyTurn: (isMyTurn: boolean) => void
    actions: GameAction[]
    setActions: (actions: GameAction[]) => void
    cards: Card[]
    setCards: (cards: Card[]) => void
}

export const GameContext = createContext<GameContextType>({
    gameManager: GameManager.getInstance(),
    opponentName: "",
    setOpponentName: (name: string) => { },
    isMyTurn: false,
    setIsMyTurn: (isMyTurn: boolean) => { },
    actions: [],
    setActions: (actions: GameAction[]) => { },
    cards: [],
    setCards: (cards: Card[]) => { },
})

export const GameContextProvider = ({ children }: { children: ReactNode }) => {

    const gameManager = GameManager.getInstance()

    const [opponentName, setOpponentName] = useState<string>("");
    const [isMyTurn, setIsMyTurn] = useState<boolean>(false);
    const [actions, setActions] = useState<GameAction[]>([])
    const [cards, setCards] = useState<Card[]>([])

    return (
        <GameContext.Provider value={
            {
                gameManager,
                opponentName,
                setOpponentName,
                isMyTurn,
                setIsMyTurn,
                actions, setActions,
                cards,
                setCards
            }
        }>
            {children}
        </GameContext.Provider>
    )
}
