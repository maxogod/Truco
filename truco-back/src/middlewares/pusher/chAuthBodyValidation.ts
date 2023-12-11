import { Request, Response, NextFunction } from 'express';
import { missingParam,invalidParamType } from '../../utils/Errors';

const chAuthBodyValidation = async (req: Request, res: Response, next: NextFunction) => {
    const errors = [];
    const socketId = req.body.socket_id;

    if(!socketId) {errors.push(missingParam("socket_id"))}
    else if (typeof socketId !== "string") {errors.push(invalidParamType("socket_id", "string", typeof socketId))}
    const channel = req.body.channel_name;
    if(!channel) {errors.push(missingParam("channel_name"))}
    else if (typeof channel !== "string") {errors.push(invalidParamType("channel_name", "string", typeof channel))}
    const user = req.body.user;
    if(!user) {errors.push(missingParam("user"))}
    if (errors.length > 0) {
        return res.status(400).json({errors});
    }
    next();
}

export default chAuthBodyValidation;