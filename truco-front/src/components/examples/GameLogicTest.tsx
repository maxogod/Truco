import { useEffect, useState } from "react";
import GameManager from '../../gameLogic/GameManager';
import { Card } from '../../gameLogic/Cards/Card';
import { GameActionMessage } from '../../gameLogic/type/GameActionMessage';
import { GameAction } from '../../gameLogic/type/GameAction';

function GameLogicTest() {
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [opponentName, setOpponentName] = useState<string>("");
    const [isMyTurn, setIsMyTurn] = useState<boolean>(false);
    const [actions, setActions] = useState<GameAction[]>([])
    const [cards, setCards] = useState<Card[]>([])
    const gameManager = GameManager.getInstance()


    useEffect(() => {
        const username = "test-name" + Math.floor(Math.random() * 10000) // TODO - replace with the real username once we have users
        gameManager.initPusher(username,[],0)
        gameManager.events.addMatchFoundListener((opponentName: string) => {
            setOpponentName(opponentName)
        })
        gameManager.events.addOnGetCardsListener((cards: Card[]) => {
            setCards(cards)
        })
        gameManager.events.addOnMyTurnStartListener(() => {
            console.log("my turn start")
            const possibleActions = gameManager.getPossibleActions()
            const newActions = []
            for (let action of possibleActions) {
                if (action[1]) {
                    newActions.push(action[0])
                }
            }
            setActions(newActions)
            setIsMyTurn(true)
        })
        gameManager.events.addOnMyTurnEndListener(() => {
            console.log("my turn end")
            setIsMyTurn(false)
            setActions([])
        })

        gameManager.events.addOnCardPlayedListener((iCalled: boolean, card: Card) => {
            if (!iCalled) {
                console.log("opponent played card: " + card.number + " " + card.suit)
                return;
            }
            console.log("i played card: " + card.number + " " + card.suit)
            const cardIndex = cards.findIndex((c) => c.number === card.number && c.suit === card.suit)
            cards.splice(cardIndex, 1)
        })

        gameManager.events.addOnGameEndListener((IWon: boolean) => {
            console.log("game end")
            console.log(IWon)
            setIsMyTurn(false)
            setActions([])
            setOpponentName("")
            setCards([])
            setIsSearching(false)
        })
        gameManager.events.addOnPointsUpdateListener((myPoints: number, opponentPoints: number) => {
            console.log("points update")
            console.log(myPoints)
            console.log(opponentPoints)
        })
    }, [])

    const toggleMatchmaking = () => {
        setIsSearching(!isSearching)
        if (isSearching) {
            gameManager.leaveMatchmaking()
        } else {
            gameManager.joinMatchmaking()
        }
    }

    const playAction = (actionName: GameAction) => {
        let payload = {}
        if (actionName === GameAction.PLACE_CARD) {
            payload = { card: cards[0] }
            setCards(cards.slice(1))
        }
        gameManager.sendAction(new GameActionMessage(actionName, payload))
    }
    const buttonStyle = "bg--500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"

    return (
        <div>
            <button className={buttonStyle} onClick={toggleMatchmaking}>"{isSearching ? "Stop" : "Play"}"</button>
            {opponentName && <div>Match found! Opponent: {opponentName}</div>}
            {isMyTurn ? actions.map((action, index) => {
                return <button className={buttonStyle} key={index} onClick={() => playAction(action)}>{action}</button>
            }) : ""}
        </div>
    )
}

export default GameLogicTest
