import Pusher, { Channel } from 'pusher-js';
interface ChannelMap {
    [key: string]: Channel;
}

const CHANNELS: ChannelMap = {};

export default function connectChannel(channelName: string) {
    if (CHANNELS[channelName]) {
        return CHANNELS[channelName];
    }
    Pusher.logToConsole = true; // TODO remove in production
    const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
        cluster: 'sa1',
        // @ts-ignore
        channelAuthorization:
        {
            endpoint: "http://localhost:8080/api/pusher",
        }
    });
    const channel: Channel = pusher.subscribe(channelName);
    CHANNELS[channelName] = channel;
    return channel;
}