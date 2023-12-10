import { useContext, useEffect } from "react"
import { Card } from "../gameLogic/Cards/Card"
import { useNavigate } from "react-router-dom"
import { GameContext } from "../context/gameContext"
import { UserContext } from "../context/userContext"
import { addLoss, addWin } from "../services/stats"
import WatchListEvent from "../gameLogic/type/WatchListEvent"
import User from "../@types/UserType"
import { toast } from "react-toastify"
import { GameActionMessage } from "../gameLogic/type/GameActionMessage"
import { GameAction, getPrintableAction } from "../gameLogic/type/GameAction"

export const usePusherListeners = (
    setGameEnded: (gameEnded: boolean) => void,
) => {

    const { user, setUser, setOnlineFriends, setFriendRequests, setFriends, friends } = useContext(UserContext)

    const {
        gameManager,
        setOpponentName,
        setCards,
        setOpponentCardsNumber,
        setActions,
        setTimerActive,
        setIsMyTurn,
        setCardsOnBoard,
        setMyPoints,
        setOpponentPoints
    } = useContext(GameContext)


    const navigate = useNavigate()


    useEffect(() => {
        if (!user) {
            gameManager.disconnect();
            return
        }
        const username = user.username
        gameManager.initPusher(username, friends, user.rating)
    }, [user])

    useEffect(() => {
        let currentOpponentRating = 0

        gameManager.events.addMatchFoundListener((opponentName: string, opponentRating: number) => {
            currentOpponentRating = opponentRating
            setOpponentName(opponentName)
            navigate("/play")
        })

        gameManager.events.addOnGetCardsListener((cards: Card[]) => {
            setTimeout(() => {
                setCardsOnBoard((prev) => prev.map(() => null))
                setCards(cards)
                setOpponentCardsNumber(3)
            }, 1000)
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
            console.log("card played")
            let newCardAdded = false
            setCardsOnBoard((prev) => prev.map((c) => {
                if (!c && !newCardAdded) {
                    newCardAdded = true
                    return card
                }
                return c
            }))
            if (!iCalled) {
                console.log("opponent played card: " + card.number + " " + card.suit)
                setOpponentCardsNumber((prev) => prev - 1)
                return;
            }

            setCards((prev) => prev.map((c) => {
                if (!c) return null
                if (c.number === card.number && c.suit === card.suit) return null
                return c
            }))
            console.log("i played card: " + card.number + " " + card.suit)
        })

        
        gameManager.events.addOnOpponentActionListener((actionMessage:GameActionMessage) => {
            if(actionMessage.action !== GameAction.PLACE_CARD && actionMessage.action !== GameAction.NONE){
                toast(getPrintableAction(actionMessage.action))
            }
        })

        gameManager.events.addOnGameEndListener((IWon: boolean) => {
            console.log("game end")
            console.log(IWon)
            setGameEnded(true)
            setIsMyTurn(false)
            setActions([])
            setOpponentName("")
            setMyPoints(0)
            setOpponentPoints(0)
            setCards((prev) => prev.map(() => null))
            setOpponentCardsNumber(0)
            setCardsOnBoard((prev) => prev.map(() => null))
            setTimeout(async () => {
                if (IWon) {
                    const newRating = await addWin(user?.rating as number, currentOpponentRating)
                    gameManager.setRating(newRating.data.updatedRating)
                    setUser((prev) => {
                        if (!prev) return prev
                        return {
                            ...prev,
                            wins: prev.wins + 1,
                            rating: newRating.data.updatedRating
                        }
                    })
                } else {
                    const newRating = await addLoss(user?.rating as number, currentOpponentRating)
                    gameManager.setRating(newRating.data)
                    setUser((prev) => {
                        if (!prev) return prev
                        return {
                            ...prev,
                            losses: prev.losses + 1,
                            rating: newRating.data.updatedRating
                        }
                    })
                }
            }, 2000)
            {IWon ? toast.success("You won the game!", {theme: "colored", hideProgressBar: true, autoClose:3000}) : toast.error("You lost the game", {theme: "colored", hideProgressBar: true, autoClose:3000})}
            navigate("/")
        })
        gameManager.events.addOnPointsUpdateListener((myPoints: number, opponentPoints: number) => {
            console.log("points update")
            console.log(myPoints)
            console.log(opponentPoints)
            setMyPoints(myPoints)
            setOpponentPoints(opponentPoints)
        })

        gameManager.events.addOnUpdateOnlineFriendsListener((watchlistEvent: WatchListEvent) => {
            if (watchlistEvent.name === "offline") {
                setOnlineFriends((prev) => prev.filter((friend) => !watchlistEvent.user_ids.includes(friend)))
            }
            else if (watchlistEvent.name === "online") {
                setOnlineFriends((prev) => [...prev, ...watchlistEvent.user_ids])
            }
        })

        gameManager.events.addOnFriendRequestListener((friendUser: User) => {
            toast(friendUser.username + " sent you a friend request!", {autoClose:4000})
            setFriendRequests((prev) => [...prev, friendUser])
        })

        gameManager.events.addOnGameChallengeListener((data: { challengerName: string, challengerRating: number }) => {
            toast(data.challengerName + " challenged you to a game!")
            gameManager.acceptChallenge(data.challengerName, data.challengerRating) // TODO replace with logic
        })

        gameManager.events.addOnFriendRequestAcceptedListener((username: string) => {
            if (!user) return
            toast(username + " accepted your friend request!", {autoClose:4000})
            setFriends((prev) => {
                const newFriends = [...prev, username]
                gameManager.initPusher(user.username, newFriends, user.rating)
                return newFriends
            })
        })

    }, [])
}