export enum ChannelName {
    Matchmaking = 'presence-matchmaking',
}

export const makeChannel = (channelName: string) => `presence-${channelName}`;