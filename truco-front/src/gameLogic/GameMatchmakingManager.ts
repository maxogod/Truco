import generateRandomName from "../utils/generateRandomName";
import GameEventsManager from "./GameEventsManager";
import PusherManager from "./PusherManager";
import { ChannelName, makeChannel } from "./enum/ChannelName";
import { EventName } from "./enum/EventName";
import { Members } from 'pusher-js';


export default class GameMatchmakingManager {

    private pusherManager: PusherManager
    private gameEventsManager: GameEventsManager
    private userName: string

    constructor(pusherManger: PusherManager, gameEventsManager: GameEventsManager) {
        this.pusherManager = pusherManger
        this.gameEventsManager = gameEventsManager
        this.userName = generateRandomName();
    }

    public setUserName(userName: string) {
        this.pusherManager.disconnectChannel(makeChannel(this.userName))
        this.userName = userName
        this.joinSelfLobby()
    }

    public getUserName(): string {
        return this.userName
    }

    private onConnectedToMatchmaking(members: Members){
            let otherMember: any = null;

            if (members.count <= 1) return
            members.each((member: any) => {
                if (member.id === members.me.id || otherMember) return
                otherMember = member
            })
            if (otherMember) {
                this.pusherManager.connectChannel(makeChannel(otherMember.info.name), (_, opponentChannel) =>{
                    opponentChannel.trigger(EventName.MATCH_FOUND, { opponentName: this.userName })
                })
                this.gameEventsManager.onMatchFound(otherMember.info.name)
                this.pusherManager.disconnectChannel(makeChannel(this.userName))
            }
        }

    public joinMatchmaking() {
        this.joinSelfLobby()
        this.pusherManager.connectChannel(ChannelName.Matchmaking, this.onConnectedToMatchmaking.bind(this))
    }

    private onMatchFound(opponentName: string) {
        this.pusherManager.disconnectChannel(ChannelName.Matchmaking)
        this.gameEventsManager.onMatchFound(opponentName)
    }

    private joinSelfLobby() {
        const channel = this.pusherManager.connectChannel(makeChannel(this.userName))
        channel.bind(EventName.MATCH_FOUND, this.onMatchFound.bind(this))
        return channel
    }
}