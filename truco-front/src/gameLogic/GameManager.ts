import PusherManager from './PusherManager'
import GameEventsManager from './GameEventsManager'
import GameMatchmakingManager from './GameMatchmakingManager'
import GameTurnsManager from './GameTurnsManager'
import { GameActionMessage, GameAction } from './enum/GameAction'
import GameState from './GameState'

export default class GameManager {
    public static instance: GameManager
    private pusherManager: PusherManager
    private gameEventsManager: GameEventsManager
    private gameMatchmakingManager: GameMatchmakingManager
    private gameTurnsManager: GameTurnsManager
    private gameState: GameState;

    private constructor() {
        this.pusherManager = new PusherManager()
        this.gameEventsManager = new GameEventsManager()
        this.gameMatchmakingManager = new GameMatchmakingManager(this.pusherManager, this.gameEventsManager)
        this.gameState = new GameState()
        this.gameTurnsManager = new GameTurnsManager(this.gameEventsManager, 10000) // 10 seconds for testing
    }

    public joinMatchmaking() {
        this.gameMatchmakingManager.joinMatchmaking()
    }
    
    public setUserName(userName: string) {
        this.gameMatchmakingManager.setUserName(userName)
    }

    public getUserName(): string {
        return this.gameMatchmakingManager.getUserName()
    }

    public startMatch() {
        this.gameTurnsManager.startMatch(this.gameMatchmakingManager.getMatchChannel())
    }

    public sendAction(action: GameActionMessage) {
        this.gameTurnsManager.sendAction(action)
    }

    public setOnMatchFound(handler: (opponentName: string) => void) {
        this.gameEventsManager.setOnMatchFound(handler)
    }

    public setOnGameStart(handler: () => void) {
        this.gameEventsManager.setOnGameStart(handler)
    }

    public setOnGetTurn(handler: (gameActionMessage: GameActionMessage) => void) {
        this.gameEventsManager.setOnGetTurn(handler)
    }

    public setOnMyTurnEnd(handler: () => void) {
        this.gameEventsManager.setOnMyTurnEnd(handler)
    }

    public getPossibleActions(): Map<GameAction, boolean> {
        return this.gameState.getPossibleActions()
    }

    public setLastAction(action: GameAction) {
        this.gameState.setLastAction(action)
    }

    public finishFirstTurn() {
        this.gameState.finishFirstTurn()
    }

    public resetPossibleActions() {
        this.gameState.resetPossibleActions()
    }



    public static getInstance(): GameManager {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager()
        }
        return GameManager.instance
    }
}
