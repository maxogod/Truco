import PusherManager from './PusherManager'
import GameEventsManager from './GameEventsManager'
import GameMatchmakingManager from './GameMatchmakingManager'

export default class GameManager {
    public static instance: GameManager
    private pusherManager: PusherManager
    private gameEventsManager: GameEventsManager
    private gameMatchmakingManager: GameMatchmakingManager

    private constructor() {
        this.pusherManager = new PusherManager()
        this.gameEventsManager = new GameEventsManager()
        this.gameMatchmakingManager = new GameMatchmakingManager(this.pusherManager, this.gameEventsManager)
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

    public setOnMatchFound(handler: (opponentName: string) => void) {
        this.gameEventsManager.setOnMatchFound(handler)
    }

    public static getInstance(): GameManager {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager()
        }
        return GameManager.instance
    }
}
