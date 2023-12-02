import { useContext, useEffect } from "react"
import { Card } from "../gameLogic/Cards/Card"
import { useNavigate } from "react-router-dom"
import { GameContext } from "../context/gameContext"

export const usePusherListeners = (
) => {

    const {
        gameManager,
        setOpponentName,
        setCards,
        setActions,
        setTimerActive,
        setIsMyTurn,
        setCardsOnBoard,
        setMyPoints,
        setOpponentPoints,
    } = useContext(GameContext)

    const navigate = useNavigate()

    useEffect(() => {
        const username = "test-name" + Math.floor(Math.random() * 10000) // TODO - replace with the real username once we have users
        gameManager.initPusher(username)

        gameManager.events.addMatchFoundListener((opponentName: string) => {
            setOpponentName(opponentName)
            navigate("/play")
        })

        gameManager.events.addOnGetCardsListener((cards: Card[]) => {
            setCardsOnBoard([])
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
            setTimerActive(true)
        })

        gameManager.events.addOnMyTurnEndListener(() => {
            console.log("my turn end")
            setIsMyTurn(false)
            setTimerActive(false)
            setActions([])
        })

        gameManager.events.addOnCardPlayedListener((iCalled: boolean, card: Card) => {
            if (!iCalled) {
                console.log("opponent played card: " + card.number + " " + card.suit)
                setCardsOnBoard((cards: Card[]) => [...cards, card])
                return;
            }
            console.log("i played card: " + card.number + " " + card.suit)
            setCards((cards: Card[]) => cards.filter((c) => c.number !== card.number && c.suit !== card.suit))
        })

        gameManager.events.addOnGameEndListener((IWon: boolean) => {
            console.log("game end")
            console.log(IWon)
            setIsMyTurn(false)
            setActions([])
            setOpponentName("")
            setCards([])
            setTimeout(() => {
                navigate("/") // TODO - replace with a modal saying who won
            }, 2000)
        })
        gameManager.events.addOnPointsUpdateListener((myPoints: number, opponentPoints: number) => {
            console.log("points update")
            console.log(myPoints)
            console.log(opponentPoints)
            setMyPoints(myPoints)
            setOpponentPoints(opponentPoints)
        })
    }, [])
}