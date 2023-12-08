import User from "../@types/UserType";
import { Card } from "./Cards/Card";
import { GameActionMessage } from "./type/GameActionMessage";
import WatchListEvent from "./type/WatchListEvent";

export default class GameEventsManager {

    public static instance: GameEventsManager
    public static STOP_PROPAGATION_ERROR = new Error("Stop propagation")

    onMatchFoundListeners: ((opponentName: string) => void)[] = []

    onJoiningLobbyListeners: ((opponentName: string) => void)[] = []

    onGameStartListeners: (() => void)[] = []

    onOpponentActionListeners: ((gameActionMessage: GameActionMessage) => void)[] = []

    onMyTurnEndListeners: (() => void)[] = []

    onTurnMissedListeners: (() => void)[] = []

    onGiveCardsListeners: (() => void)[] = []

    onCardPlayedListeners: ((iCalled: boolean, card: Card) => void)[] = []

    onTrucoPointCalculationListeners: ((amIWinner: number) => void)[] = []

    onEnvidoPlayedListeners: ((isAccepted: boolean, iCalled: boolean) => void)[] = []

    onTrucoResponseListeners: ((isAccepted: boolean, iCalled: boolean) => void)[] = []

    onTrucoWinnerListeners: ((IWon: boolean) => void)[] = []

    onGetCardsListeners: ((cards: Card[]) => void)[] = []

    onMyTurnStartListeners: (() => void)[] = []

    onFinishEnvidoPhaseListeners: (() => void)[] = []

    onGameEndListeners: ((IWon: boolean) => void)[] = []

    onIrAlMazoListeners: ((iCalled: boolean, isEnvidoPhase:boolean) => void)[] = []

    onNewRoundListeners: (() => void)[] = []

    onPointsUpdateListeners: ((myPoints:number, opponentPoints: number) => void)[] = []

    onUpdateOnlineFriendsListeners: ((watchlistEvent:  WatchListEvent) => void)[] = []

    onFriendRequestListeners: ((friendUser: User) => void)[] = []

    onFriendRequestAcceptedListeners: ((friendUsername: string) => void)[] = []

    onGameChallengeListeners: ((opponentName: string) => void)[] = []


    addOnMatchFoundListener(handler: (opponentName: string) => void) {
        this.onMatchFoundListeners.push(handler)
    }

    addOnJoiningLobbyListener(handler: (opponentName: string) => void) {
        this.onJoiningLobbyListeners.push(handler)
    }

    addOnGameStartListener(handler: () => void) {
        this.onGameStartListeners.push(handler)
    }

    addOnOpponentActionListener(handler: (gameActionMessage: GameActionMessage) => void) {
        this.onOpponentActionListeners.push(handler)
    }

    addOnMyTurnEndListener(handler: () => void) {
        this.onMyTurnEndListeners.push(handler)
    }

    addOnTurnMissedListener(handler: () => void) {
        this.onTurnMissedListeners.push(handler)
    }

    addOnGiveCardsListener(handler: () => void) {
        this.onGiveCardsListeners.push(handler)
    }

    addOnEnvidoPlayedListener(handler: (isAccepted: boolean, iCalled: boolean) => void) {
        this.onEnvidoPlayedListeners.push(handler)
    }

    addOnTrucoResponseListener(handler: (isAccepted: boolean, iCalled: boolean) => void) {
        this.onTrucoResponseListeners.push(handler)
    }

    addOnCardPlayedListener(handler: (iCalled: boolean, card: Card) => void) {
        this.onCardPlayedListeners.push(handler)
    }

    addOnTrucoPointCalculationListener(handler: (amIWinner: number) => void) {
        this.onTrucoPointCalculationListeners.push(handler)
    }

    addOnTrucoWinnerListener(handler: (IWon: boolean) => void) {
        this.onTrucoWinnerListeners.push(handler)
    }

    addOnGetCardsListener(handler: (cards: Card[]) => void) {
        this.onGetCardsListeners.push(handler)
    }

    addOnMyTurnStartListener(handler: () => void) {
        this.onMyTurnStartListeners.push(handler)
    }

    addOnFinishEnvidoPhaseListener(handler: () => void) {
        this.onFinishEnvidoPhaseListeners.push(handler)
    }

    addOnGameEndListener(handler: (IWon: boolean) => void) {
        this.onGameEndListeners.push(handler)
    }

    addOnIrAlMazoListener(handler: (iCalled: boolean, isEnvidoPhase:boolean) => void) {
        this.onIrAlMazoListeners.push(handler)
    }

    addOnNewRoundListener(handler: () => void) {
        this.onNewRoundListeners.push(handler)
    }

    addOnPointsUpdateListener(handler: (myPoints:number, opponentPoints:number) => void) {
        this.onPointsUpdateListeners.push(handler)
    }

    addOnUpdateOnlineFriendsListener(handler: (watchlistEvent:  WatchListEvent) => void) {
        this.onUpdateOnlineFriendsListeners.push(handler)
    }

    addOnFriendRequestListener(handler: (friendUser: User) => void) {
        this.onFriendRequestListeners.push(handler)
    }

    addOnFriendRequestAcceptedListener(handler: (friendUsername: string) => void) {
        this.onFriendRequestAcceptedListeners.push(handler)
    }

    addOnGameChallengeListener(handler: (opponentName: string) => void) {
        this.onGameChallengeListeners.push(handler)
    }

    triggerOnMatchFound(opponentName: string) {
        try {
            this.onMatchFoundListeners.forEach(listener => listener(opponentName))
        } catch (e) {
            if (e === GameEventsManager.STOP_PROPAGATION_ERROR) {
                return
            }
            throw e
        }
    }

    triggerOnJoiningLobby(opponentName: string) {
        try {
            this.onJoiningLobbyListeners.forEach(listener => listener(opponentName))
        } catch (e) {
            if (e === GameEventsManager.STOP_PROPAGATION_ERROR) {
                return
            }
            throw e
        }
    }

    triggerOnGameStart() {
        try {
            this.onGameStartListeners.forEach(listener => listener())
        } catch (e) {
            if (e === GameEventsManager.STOP_PROPAGATION_ERROR) {
                return
            }
            throw e
        }
    }

    triggerOnOpponentAction(gameActionMessage: GameActionMessage) {
        try {
            this.onOpponentActionListeners.forEach(listener => listener(gameActionMessage))
        } catch (e) {
            if (e === GameEventsManager.STOP_PROPAGATION_ERROR) {
                return
            }
            throw e
        }
    }

    triggerOnMyTurnEnd() {
        try {
            this.onMyTurnEndListeners.forEach(listener => listener())
        } catch (e) {
            if (e === GameEventsManager.STOP_PROPAGATION_ERROR) {
                return
            }
            throw e
        }
    }

    triggerOnTurnMissed() {
        try {
            this.onTurnMissedListeners.forEach(listener => listener())
        } catch (e) {
            if (e === GameEventsManager.STOP_PROPAGATION_ERROR) {
                return
            }
            throw e
        }
    }

    triggerOnGiveCards() {
        try {
            this.onGiveCardsListeners.forEach(listener => listener())
        } catch (e) {
            if (e === GameEventsManager.STOP_PROPAGATION_ERROR) {
                return
            }
            throw e
        }
    }

    triggerOnEnvidoPlayed(isAccepted: boolean, iCalled: boolean) {
        try {
            this.onEnvidoPlayedListeners.forEach(listener => listener(isAccepted, iCalled))
        } catch (e) {
            if (e === GameEventsManager.STOP_PROPAGATION_ERROR) {
                return
            }
            throw e
        }
    }

    triggerOnTrucoResponse(isAccepted: boolean, iCalled: boolean) {
        try {
            this.onTrucoResponseListeners.forEach(listener => listener(isAccepted, iCalled))
        } catch (e) {
            if (e === GameEventsManager.STOP_PROPAGATION_ERROR) {
                return
            }
            throw e
        }
    }

    triggerOnCardPlayed(iCalled: boolean, card: Card) {
        try {
            this.onCardPlayedListeners.forEach(listener => listener(iCalled, card))
        } catch (e) {
            if (e === GameEventsManager.STOP_PROPAGATION_ERROR) {
                return
            }
            throw e
        }
    }

    triggerOnTrucoPointCalculation(amIWinner: number) {
        try {
            this.onTrucoPointCalculationListeners.forEach(listener => listener(amIWinner))
        } catch (e) {
            if (e === GameEventsManager.STOP_PROPAGATION_ERROR) {
                return
            }
            throw e
        }
    }

    triggerOnTrucoWinner(IWon: boolean) {
        try {
            this.onTrucoWinnerListeners.forEach(listener => listener(IWon))
        } catch (e) {
            if (e === GameEventsManager.STOP_PROPAGATION_ERROR) {
                return
            }
            throw e
        }
    }

    triggerOnGetCards(cards: Card[]) {
        try {
            this.onGetCardsListeners.forEach(listener => listener(cards))
        } catch (e) {
            if (e === GameEventsManager.STOP_PROPAGATION_ERROR) {
                return
            }
            throw e
        }
    }

    triggerOnMyTurnStart() {
        try {
            this.onMyTurnStartListeners.forEach(listener => listener())
        } catch (e) {
            if (e === GameEventsManager.STOP_PROPAGATION_ERROR) {
                return
            }
            throw e
        }
    }

    triggerOnFinishEnvidoPhase() {
        try {
            this.onFinishEnvidoPhaseListeners.forEach(listener => listener())
        } catch (e) {
            if (e === GameEventsManager.STOP_PROPAGATION_ERROR) {
                return
            }
            throw e
        }
    }

    triggerOnGameEnd(IWon: boolean) {
        try {
            this.onGameEndListeners.forEach(listener => listener(IWon))
        } catch (e) {
            if (e === GameEventsManager.STOP_PROPAGATION_ERROR) {
                return
            }
            throw e
        }
    }

    triggerOnIrAlMazo(iCalled: boolean, isEnvidoPhase:boolean) {
        try {
            this.onIrAlMazoListeners.forEach(listener => listener(iCalled,isEnvidoPhase))
        } catch (e) {
            if (e === GameEventsManager.STOP_PROPAGATION_ERROR) {
                return
            }
            throw e
        }
    }

    triggerOnNewRound() {
        try {
            this.onNewRoundListeners.forEach(listener => listener())
        } catch (e) {
            if (e === GameEventsManager.STOP_PROPAGATION_ERROR) {
                return
            }
            throw e
        }
    }
    triggerOnPointsUpdate(myPoints:number, opponentPoints:number) {
        try {
            this.onPointsUpdateListeners.forEach(listener => listener(myPoints,opponentPoints))
        } catch (e) {
            if (e === GameEventsManager.STOP_PROPAGATION_ERROR) {
                return
            }
        }
    }

    triggerOnUpdateOnlineFriends(watchlistEvent:  WatchListEvent) {
        try {
            this.onUpdateOnlineFriendsListeners.forEach(listener => listener(watchlistEvent))
        } catch (e) {
            if (e === GameEventsManager.STOP_PROPAGATION_ERROR) {
                return
            }
        }
    }

    triggerOnFriendRequest(friendUser: User) {
        try {
            this.onFriendRequestListeners.forEach(listener => listener(friendUser))
        } catch (e) {
            if (e === GameEventsManager.STOP_PROPAGATION_ERROR) {
                return
            }
        }
    }

    triggerOnFriendRequestAccepted(friendUsername: string) {
        console.log("friend request accepted")
        console.log(friendUsername)
        try {
            this.onFriendRequestAcceptedListeners.forEach(listener => listener(friendUsername))
        } catch (e) {
            if (e === GameEventsManager.STOP_PROPAGATION_ERROR) {
                return
            }
        }
    }

    triggerOnGameChallenge(opponentName: string) {
        try {
            this.onGameChallengeListeners.forEach(listener => listener(opponentName))
        } catch (e) {
            if (e === GameEventsManager.STOP_PROPAGATION_ERROR) {
                return
            }
        }
    }



    static getInstance(): GameEventsManager {
        if (!GameEventsManager.instance) {
            GameEventsManager.instance = new GameEventsManager()
        }
        return GameEventsManager.instance
    }

}