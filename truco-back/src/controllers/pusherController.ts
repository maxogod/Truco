import Pusher from "pusher";
import { Request,Response } from "express";
import dotenv from "dotenv";
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

    public authenticate(req: Request, res: Response) {
        const socketId = req.body.socket_id;
        const channel = req.body.channel_name;
        // This authenticates every user. Don't do this in production!
        const authResponse = this.pusher.authorizeChannel(socketId, channel);
        res.send(authResponse);
    }
}

export default new PusherController();