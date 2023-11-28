import Pusher, { Channel, Members } from 'pusher-js';

export default class PusherManager {
    private pusher: Pusher
    private channels: Map<string, Channel>;

    constructor() {
        this.pusher = this.initPusher()
        this.channels = new Map<string, Channel>();
    }

    initPusher() {
        Pusher.logToConsole = true; // TODO remove in production
        return new Pusher(import.meta.env.VITE_PUSHER_KEY, {
            cluster: 'sa1',
            // @ts-ignore
            channelAuthorization:
            {
                endpoint: import.meta.env.VITE_PUSHER_AUTH_ENDPOINT,
            }
        });
    }

    connectChannel(channelName: string, onSubscriptionSucceeded: (members: Members, channel: Channel) => void = () => { }): Channel {
        if (this.channels.has(channelName)) {
            return this.channels.get(channelName) as Channel;
        }

        const channel: Channel = this.pusher.subscribe(channelName);
        this.channels.set(channelName, channel);
        channel.bind('pusher:subscription_succeeded', (members:Members) => onSubscriptionSucceeded(members, channel))
        return channel;
    }

    disconnectChannel(channelName: string) {
        if (this.channels.has(channelName)) {
            const channel = this.channels.get(channelName) as Channel;
            this.pusher.unsubscribe(channelName);
            channel.unsubscribe();
            this.channels.delete(channelName);
        }
    }

    getChannel(channelName: string): Channel | null {
        if (this.channels.has(channelName)) {
            return this.channels.get(channelName) as Channel;
        }
        return null;
    }

}