import { Request, Response } from 'express';
import { acceptFriendRequestService, sendFriendRequestService } from '../services/friendsService';

const sendFriendRequestController = async (req: Request, res: Response) => {

    const { targetUsername } = req.params;

    if (!req.session.user) return res.status(401).send("Not logged in");
    if (!targetUsername) return res.status(400).send("No target username");
    if (targetUsername === req.session.user.username) return res.status(400).send("Cannot add yourself");

    const added = await sendFriendRequestService(req.session.user.username, targetUsername);

    if (!added) return res.status(400).send("Could not add friend");

    return res.status(200).send("Friend request sent");
}

const acceptFriendRequestController = async (req: Request, res: Response) => {

    const { targetUsername } = req.params;

    if (!req.session.user) return res.status(401).send("Not logged in");
    if (!targetUsername) return res.status(400).send("No target username");

    const added = await acceptFriendRequestService(req.session.user.username, targetUsername);

    if (!added) return res.status(400).send("Could not add friend");

    return res.status(200).send("Friend added");
}

export {
    sendFriendRequestController,
    acceptFriendRequestController,
}