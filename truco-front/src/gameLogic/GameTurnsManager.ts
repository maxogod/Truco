import { Channel } from 'pusher-js';
import GameEventsManager from './GameEventsManager';
import { EventName } from './enum/EventName';
import { GameActionMessage } from './enum/GameAction';

export default class GameTurnsManager {

    private currentTimer: number = 0
    private gameChannel: Channel | null = null;
    private gameEventsManager: GameEventsManager
    private turnDuration: number

    constructor(gameEventsManager: GameEventsManager, turnDuration: number) {
        this.gameEventsManager = gameEventsManager
        this.turnDuration = turnDuration
    }

    public startMatch(gameChannel: Channel | null){
        if(!gameChannel) throw new Error("Unable to start match")
        this.gameChannel = gameChannel
        this.setUpGameChannel()
        this.gameEventsManager.onGameStart()
        this.startTurnTimer()
    }

    private startTurnTimer(){
        this.currentTimer = setTimeout(this.onMyTurnEnd.bind(this), this.turnDuration) // 10 seconds for testing
    }

    public sendAction(action: GameActionMessage){
        this.gameChannel?.trigger(EventName.SEND_ACTION, action)
        this.onMyTurnEnd()
    }

    private setUpGameChannel(){
        this.gameChannel?.bind(EventName.FINISH_TURN, this.onOpponentFinishTurn.bind(this))
    }

    private onOpponentFinishTurn(gameActionMessage: GameActionMessage){
        this.startTurnTimer()
        this.gameEventsManager.onOpponentFinishTurn(gameActionMessage);
    }

    private onMyTurnEnd(){
        clearTimeout(this.currentTimer)
        this.currentTimer = 0
        this.gameEventsManager.onMyTurnEnd()
    }
}