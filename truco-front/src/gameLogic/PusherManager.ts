import Pusher, { Channel, Members } from 'pusher-js';
import GameEventsManager from './GameEventsManager';

export default class PusherManager {
    private pusher: Pusher | null
    private channels: Map<string, Channel>;
    private gameEventsManager: GameEventsManager;

    constructor() {
        this.pusher = null;
        this.channels = new Map<string, Channel>();
        this.gameEventsManager = GameEventsManager.getInstance();
    }

    public initPusher(userName: string, friends: string[]) {
        //Pusher.logToConsole = true; // TODO remove in production
        if (this.pusher) {
            this.disconnectPusher();
        }
        this.pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
            cluster: 'sa1',
            // @ts-ignore
            channelAuthorization:
            {
                endpoint: import.meta.env.VITE_PUSHER_CHANNEL_ENDPOINT,
                params: {
                    user: JSON.stringify({
                        user_id: userName,
                        user_info: {
                            name: userName,
                        },
                    })
                },
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // TODO remove in production
                }
            },
            // @ts-ignore
            userAuthentication: {
                endpoint: import.meta.env.VITE_PUSHER_USER_ENDPOINT,
                params: {
                    user: JSON.stringify({
                        id: userName,
                        user_info: {
                            name: userName,
                        },
                        watchlist: friends
                    })
                },
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // TODO remove in production
                }
            },
        });
        this.pusher.signin();
        this.pusher.user.watchlist.bind('online', this.gameEventsManager.triggerOnUpdateOnlineFriends.bind(this.gameEventsManager))
        this.pusher.user.watchlist.bind('offline', this.gameEventsManager.triggerOnUpdateOnlineFriends.bind(this.gameEventsManager));
        console.log(userName)
        this.pusher.user.bind('friend-request', this.gameEventsManager.triggerOnFriendRequest.bind(this.gameEventsManager));
        this.pusher.user.bind('friend-request-accepted', this.gameEventsManager.triggerOnFriendRequestAccepted.bind(this.gameEventsManager));
        this.pusher.user.bind('game-challenge',this.gameEventsManager.triggerOnGameChallenge.bind(this.gameEventsManager));
    }

    connectChannel(channelName: string, onSubscriptionSucceeded: (members: Members, channel: Channel) => void = () => { }): Channel {
        if (this.channels.has(channelName)) {
            return this.channels.get(channelName) as Channel;
        }
        const channel: Channel = this.pusher?.subscribe(channelName) as Channel;
        this.channels.set(channelName, channel);
        channel.bind('pusher:subscription_succeeded', (members: Members) => onSubscriptionSucceeded(members, channel))
        return channel;
    }

    disconnectChannel(channelName: string) {
        if (this.channels.has(channelName)) {
            this.pusher?.unsubscribe(channelName);
            this.channels.delete(channelName);
        }
    }

    disconnectAll() {
        this.channels.forEach((channel: Channel, channelName: string) => {
            this.disconnectChannel(channelName)
        })

    }

    disconnectPusher() {
        this.pusher?.disconnect();
        this.channels = new Map<string, Channel>();
        this.pusher = null;
    }

    getChannel(channelName: string): Channel | null {
        if (this.channels.has(channelName)) {
            return this.channels.get(channelName) as Channel;
        }
        return null;
    }

}