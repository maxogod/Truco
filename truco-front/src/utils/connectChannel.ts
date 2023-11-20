import Pusher, { Channel } from 'pusher-js';

interface ChannelMap {
    [key: string]: Channel;
}

const CHANNELS: ChannelMap = {};

export default function connectChannel(channelName: string) {
    if (CHANNELS[channelName]) {
        return CHANNELS[channelName];
    }
    Pusher.logToConsole = true;
    const pusher = new Pusher('53ab858f5949e610d7ee', {
        cluster: 'sa1',
        channelAuthorization: //ignore this error, it's a typescript lie
        {
            endpoint: "http://localhost:8080/api/pusher",
        }
    });
    const channel: Channel = pusher.subscribe(channelName);
    CHANNELS[channelName] = channel;
    return channel;
}