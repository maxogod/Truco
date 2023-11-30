import { useEffect, useRef, useState } from "react";
import GameManager from '../../gameLogic/GameManager';
import { Card } from '../../gameLogic/Cards/Card';
import { GameActionMessage } from '../../gameLogic/type/GameActionMessage';
import { GameAction } from '../../gameLogic/type/GameAction';
import Timer from "../matchmaking/matchmakingTimer";
import { usePusherListeners } from "../../hooks/usePusherListeners";

function GameLogicTest() {
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const isSearchingRef = useRef<boolean>(false);

    const [opponentName, setOpponentName] = useState<string>("");
    const [isMyTurn, setIsMyTurn] = useState<boolean>(false);
    const [actions, setActions] = useState<GameAction[]>([])
    const [cards, setCards] = useState<Card[]>([])
    const gameManager = GameManager.getInstance()


    usePusherListeners(gameManager, setOpponentName, setCards, setActions, setIsMyTurn)

    const toggleMatchmaking = () => {
        if (isSearchingRef.current) {
            setIsSearching(false)
            isSearchingRef.current = false
            gameManager.leaveMatchmaking()
            return
        }

        setIsSearching(true)
        isSearchingRef.current = true

        setTimeout(() => {
            if (!isSearchingRef.current) return
            gameManager.joinMatchmaking()
        }, 4000)
    }

    const playAction = (actionName: GameAction) => {
        let payload = {}
        if (actionName === GameAction.PLACE_CARD) {
            payload = { card: cards[0] }
            setCards(cards.slice(1))
        }
        gameManager.sendAction(new GameActionMessage(actionName, payload))
    }
    const buttonStyle = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"

    return (
        <div>
            <button className={buttonStyle} onClick={toggleMatchmaking}>"{isSearching ? "Stop" : "Play"}"</button>
            {isSearching && <Timer />}
            {opponentName && <div>Match found! Opponent: {opponentName}</div>}
            {isMyTurn ? actions.map((action, index) => {
                return <button className={buttonStyle} key={index} onClick={() => playAction(action)}>{action}</button>
            }) : ""}
        </div>
    )
}

export default GameLogicTest