import GameEventsManager from "./GameEventsManager";
import PusherManager from "./PusherManager";
import { ChannelName, makeChannel } from "./type/ChannelName";
import { EventName } from "./type/EventName";
import { Members, Channel } from 'pusher-js';

/* 
Local triggers:
    - OnMatchFound
    - OnJoiningLobby
Socket triggers:
    - EventName.MATCH_FOUND
*/

export default class GameMatchmakingManager {

    private pusherManager: PusherManager
    private gameEventsManager: GameEventsManager
    private userName: string
    private matchChannel: Channel | null = null
    private myChannel: Channel | null = null
    private myRating: number 

    constructor(pusherManger: PusherManager) {
        this.pusherManager = pusherManger
        this.gameEventsManager = GameEventsManager.getInstance()
        this.userName = ""
        this.myRating = 0
    }

    public restart() {
        this.matchChannel = null
        this.myChannel = this.joinSelfLobby()
    }

    public setUserName(userName: string) {
        if(this.myChannel) this.pusherManager.disconnectChannel(makeChannel(this.userName))
        this.userName = userName
        this.myChannel = this.joinSelfLobby()
    }

    public setRating(rating: number) {
        this.myRating = rating
    }

    public getUserName(): string {
        return this.userName
    }

    private onConnectedToMatchmaking(members: Members) {
        let otherMember: any = null;

        if (members.count <= 1) return
        members.each((member: any) => {
            if (member.id === members.me.id || otherMember) return
            otherMember = member
        })
        if (otherMember) {
            this.onMatchFound({ opponentName: otherMember.info.name,opponentRating:otherMember.info.rating, join: true })
        }
    }

    public joinMatchmaking() {
        this.pusherManager.connectChannel(ChannelName.Matchmaking, this.onConnectedToMatchmaking.bind(this))
    }

    public leaveMatchmaking() {
        this.pusherManager.disconnectChannel(ChannelName.Matchmaking)
    }

    public acceptChallenge(opponentName: string, opponentRating:number) {
        this.onMatchFound({ opponentName,opponentRating, join: true })
    }

    private onMatchFound(data: any) {
        const opponentName = data.opponentName
        const opponentRating = data.opponentRating
        this.pusherManager.disconnectChannel(ChannelName.Matchmaking)
        if (data.join) {
            this.onJoiningLobby(opponentName,opponentRating)
        } else {
            this.matchChannel = this.pusherManager.connectChannel(makeChannel(this.userName))
            this.gameEventsManager.triggerOnMatchFound(opponentName,opponentRating)
        }
    }

    private onJoiningLobby(opponentName: string, opponentRating:number) {
        this.matchChannel = this.pusherManager.connectChannel(makeChannel(opponentName), (_, opponentChannel) => {
            opponentChannel.trigger(EventName.MATCH_FOUND, { join: false, opponentName: this.userName,opponentRating:this.myRating })
        })
        this.pusherManager.disconnectChannel(makeChannel(this.userName))
        this.gameEventsManager.triggerOnJoiningLobby(opponentName,opponentRating)
    }

    public getMatchChannel(): Channel | null {
        return this.matchChannel;
    }

    private joinSelfLobby() {
        const channel = this.pusherManager.connectChannel(makeChannel(this.userName))
        channel.bind(EventName.MATCH_FOUND, this.onMatchFound.bind(this))
        return channel
    }
}