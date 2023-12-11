import Pusher from "pusher";
import { Request, Response } from "express";
import dotenv from "dotenv";
import User from "../models/User";
import { log } from "console";
dotenv.config();

class PusherController {
    private pusher: Pusher;
    
    constructor() {

        this.pusher = new Pusher({
            appId: process.env.PUSHER_APP_ID as string,
            key: process.env.PUSHER_KEY as string,
            secret: process.env.PUSHER_SECRET as string,
            cluster: process.env.PUSHER_CLUSTER as string,
            useTLS: true
        });
    }

    public authorizeChannel(req: Request, res: Response) {
        const socketId = req.body.socket_id;
        const channel = req.body.channel_name;
        const user = JSON.parse(req.body.user);
        // This authenticates every user. Don't do this in production!
        const authResponse = this.pusher.authorizeChannel(socketId, channel, user);
        res.json(authResponse);
    }

    public authenticateUser(req: Request, res: Response) {
        const socketId = req.body.socket_id;
        const user = JSON.parse(req.body.user);
        // This authenticates every user. Don't do this in production!
        const authResponse = this.pusher.authenticateUser(socketId, user);
        res.send(authResponse);
    }

    public challengeFriend(req: Request, res: Response) {
        const challengerName = req.body.challengerName;
        const challengerRating = req.body.challengerRating;
        this.pusher.sendToUser(req.body.opponentName, "game-challenge", { challengerName, challengerRating });
        res.sendStatus(200);
    }

    public sendFriendRequest(targetUsername: string, friendUser: any) {
        this.pusher.sendToUser(targetUsername, "friend-request", friendUser);
    }

    public acceptFriendRequest(acceptedUsername: string, username: string) {
        this.pusher.sendToUser(acceptedUsername, "friend-request-accepted", username);
    }
}

export default new PusherController();