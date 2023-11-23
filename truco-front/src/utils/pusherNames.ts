const getChannelName = (gameId: string) => `private-${gameId}`;

const getEventName = (eventName: string) => `client-${eventName}`;

export { getChannelName, getEventName };