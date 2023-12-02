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
    myPoints: number
    setMyPoints: React.Dispatch<React.SetStateAction<number>>
    opponentPoints: number
    setOpponentPoints: React.Dispatch<React.SetStateAction<number>>
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
    myPoints: 0,
    setMyPoints: () => { },
    opponentPoints: 0,
    setOpponentPoints: () => { },
})

export const GameContextProvider = ({ children }: { children: ReactNode }) => {

    const gameManager = GameManager.getInstance()

    const [opponentName, setOpponentName] = useState<string>("");

    const [isMyTurn, setIsMyTurn] = useState<boolean>(false);
    const [actions, setActions] = useState<GameAction[]>([])
    const [timerActive, setTimerActive] = useState(false);

    const [cards, setCards] = useState<Card[]>([])
    const [cardsOnBoard, setCardsOnBoard] = useState<Card[]>([])
    const [myPoints, setMyPoints] = useState<number>(0)
    const [opponentPoints, setOpponentPoints] = useState<number>(0)

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
                myPoints,
                setMyPoints,
                opponentPoints,
                setOpponentPoints
            }
        }>
            {children}
        </GameContext.Provider>
    )
}
