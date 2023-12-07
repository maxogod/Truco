import User from "../models/User"

const sendFriendRequestService = async (username: string, targetUsername: string) => {

    const user = await User.findOne({ username });
    if (!user) return false;

    const targetUser = await User.findOne({ username: targetUsername });
    if (!targetUser) return false;

    const alreadyFriends = user.friends.includes(targetUser._id);
    if (alreadyFriends) return false;

    const alreadyRequested = user.friendRequests.includes(targetUser._id);
    if (alreadyRequested) return false;

    const alreadyReceived = targetUser.friendRequests.includes(user._id);
    if (alreadyReceived) return false;

    targetUser.friendRequests.push(user._id);

    try {
        await targetUser.save();
    } catch (err) {
        console.log(err);
        return false;
    }

    return true;
}

const acceptFriendRequestService = async (username: string, targetUsername: string) => {

    const user = await User.findOne({ username });
    const targetUser = await User.findOne({ username: targetUsername });
    if (!user || !targetUser) return false;

    const alreadyFriends = user.friends.includes(targetUser._id);
    if (alreadyFriends) return false;

    const wasRequested = user.friendRequests.includes(targetUser._id);
    if (!wasRequested) return false;

    user.friends.push(targetUser._id);
    targetUser.friends.push(user._id);

    const index = user.friendRequests.indexOf(targetUser._id);
    user.friendRequests.splice(index, 1);

    try {
        await user.save();
        await targetUser.save();
    } catch (err) {
        console.log(err);
        return false;
    }

    return true;
}

export {
    sendFriendRequestService,
    acceptFriendRequestService,
}