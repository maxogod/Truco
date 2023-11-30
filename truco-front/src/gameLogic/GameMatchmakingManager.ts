import generateRandomName from "../utils/generateRandomName";
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

    constructor(pusherManger: PusherManager) {
        this.pusherManager = pusherManger
        this.gameEventsManager = GameEventsManager.getInstance()
        this.userName = ""
    }

    public setUserName(userName: string) {
        this.userName = userName
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
                this.onMatchFound({opponentName: otherMember.info.name,join:true})
            }
        }

    public joinMatchmaking() {
        this.joinSelfLobby()
        this.pusherManager.connectChannel(ChannelName.Matchmaking, this.onConnectedToMatchmaking.bind(this))
    }

    public leaveMatchmaking() {
        this.pusherManager.disconnectChannel(ChannelName.Matchmaking)
    }

    private onMatchFound(data:any) {
        const opponentName = data.opponentName
        this.pusherManager.disconnectChannel(ChannelName.Matchmaking)
        if(data.join){
            this.onJoiningLobby(opponentName)
        }else{
            this.matchChannel = this.pusherManager.connectChannel(makeChannel(this.userName))
            this.gameEventsManager.triggerOnMatchFound(opponentName)
        }
    }

    private onJoiningLobby(opponentName: string){
        this.matchChannel = this.pusherManager.connectChannel(makeChannel(opponentName), (_, opponentChannel) =>{
            opponentChannel.trigger(EventName.MATCH_FOUND, {join:false,opponentName:this.userName})
        })
        this.pusherManager.disconnectChannel(makeChannel(this.userName))
        this.gameEventsManager.triggerOnJoiningLobby(opponentName)
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