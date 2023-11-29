import { Channel } from 'pusher-js';
import GameEventsManager from './GameEventsManager';
import { EventName } from './type/EventName';
import { GameActionMessage } from './type/GameActionMessage';
import { Card } from './Cards/Card';

/* 
Local triggers:
    - OnGameStart
    - OpponentFinishTurn
    - OnMyTurnEnd
    - OnTurnMissed

Socket triggers:
    - EventName.SEND_ACTION
    - EventName.GIVE_CARDS
*/

export default class GameTurnsManager {

    private currentTimer: number = 0
    private gameChannel: Channel | null = null;
    private gameEventsManager: GameEventsManager
    private turnDuration: number

    constructor(turnDuration: number) {
        this.gameEventsManager = GameEventsManager.getInstance()
        this.turnDuration = turnDuration
    }

    private startTurnTimer(){
        this.currentTimer = setTimeout(this.onTurnMissed.bind(this), this.turnDuration)
    }

    public sendAction(action: GameActionMessage){
        this.gameChannel?.trigger(EventName.SEND_ACTION, action)
        this.onMyTurnEnd()
    }

    public giveCards(cards: Card[]){
        this.gameChannel?.trigger(EventName.GIVE_CARDS, cards)
        this.startTurnTimer()
    }

    public getGameChannel(): Channel | null{
        return this.gameChannel
    }

    public setUpGameChannel(gameChannel: Channel | null){
        if(!gameChannel) throw new Error("Could not set up game channel")
        this.gameChannel = gameChannel
        this.gameChannel?.bind(EventName.SEND_ACTION, this.onOpponentFinishTurn.bind(this))
    }

    private onOpponentFinishTurn(gameActionMessage: GameActionMessage){
        this.startTurnTimer()
        this.gameEventsManager.triggerOnOpponentFinishTurn(gameActionMessage)
    }

    private onMyTurnEnd(){
        clearTimeout(this.currentTimer)
        this.currentTimer = 0
        this.gameEventsManager.triggerOnMyTurnEnd();
    }

    private onTurnMissed(){
        clearTimeout(this.currentTimer)
        this.currentTimer = 0
        this.gameEventsManager.triggerOnTurnMissed()
    }
}