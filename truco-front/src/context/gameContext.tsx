import { ReactNode, createContext, useState } from "react";
import { Card } from "../gameLogic/Cards/Card";
import GameManager from "../gameLogic/GameManager";
import { GameAction } from "../gameLogic/type/GameAction";

interface GameContextType {
    gameManager: GameManager
    opponentName: string
    setOpponentName: React.Dispatch<React.SetStateAction<string>>
    isMyTurn: boolean
    setIsMyTurn: React.Dispatch<React.SetStateAction<boolean>>
    actions: GameAction[]
    setActions: React.Dispatch<React.SetStateAction<GameAction[]>>
    cards: Card[]
    setCards: React.Dispatch<React.SetStateAction<Card[]>>
    cardsOnBoard: Card[]
    setCardsOnBoard: React.Dispatch<React.SetStateAction<Card[]>>
    timerActive: boolean
    setTimerActive: React.Dispatch<React.SetStateAction<boolean>>
}

export const GameContext = createContext<GameContextType>({
    gameManager: GameManager.getInstance(),
    opponentName: "",
    setOpponentName: () => { },
    isMyTurn: false,
    setIsMyTurn: () => { },
    actions: [],
    setActions: () => { },
    timerActive: false,
    setTimerActive: () => { },
    cards: [],
    setCards: () => { },
    cardsOnBoard: [],
    setCardsOnBoard: () => { },
})

export const GameContextProvider = ({ children }: { children: ReactNode }) => {

    const gameManager = GameManager.getInstance()

    const [opponentName, setOpponentName] = useState<string>("");

    const [isMyTurn, setIsMyTurn] = useState<boolean>(false);
    const [actions, setActions] = useState<GameAction[]>([])
    const [timerActive, setTimerActive] = useState(false);

    const [cards, setCards] = useState<Card[]>([])
    const [cardsOnBoard, setCardsOnBoard] = useState<Card[]>([])

    return (
        <GameContext.Provider value={
            {
                gameManager,
                opponentName,
                setOpponentName,
                isMyTurn,
                setIsMyTurn,
                actions,
                setActions,
                timerActive,
                setTimerActive,
                cards,
                setCards,
                cardsOnBoard,
                setCardsOnBoard,
            }
        }>
            {children}
        </GameContext.Provider>
    )
}
