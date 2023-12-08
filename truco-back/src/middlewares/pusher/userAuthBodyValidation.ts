import { Request, Response, NextFunction } from 'express';
import { missingParam,invalidParamType } from '../../utils/Errors';

const userAuthBodyValidation = async (req: Request, res: Response, next: NextFunction) => {
    const errors = [];
    const socketId = req.body.socket_id;

    if(!socketId) {errors.push(missingParam("socket_id"))}
    else if (typeof socketId !== "string") {errors.push(invalidParamType("socket_id", "string", typeof socketId))}
    const user = req.body.user;
    if(!user) {errors.push(missingParam("user"))}
    if (errors.length > 0) {
        return res.status(400).json({errors});
    }
    next();
}

export default userAuthBodyValidation;