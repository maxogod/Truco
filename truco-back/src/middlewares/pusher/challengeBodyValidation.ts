import { Request, Response, NextFunction } from 'express';
import { missingParam,invalidParamType } from '../../utils/Errors';

const challengeBodyValidation = async (req: Request, res: Response, next: NextFunction) => {
    const errors = [];
    const opponentName = req.body.opponentName;

    if(!opponentName) {errors.push(missingParam("opponentName"))}
    else if (typeof opponentName !== "string") {errors.push(invalidParamType("opponentName", "string", typeof opponentName))}
    const challengerName = req.body.challengerName;
    if(!challengerName) {errors.push(missingParam("challengerName"))}
    else if (typeof challengerName !== "string") {errors.push(invalidParamType("challengerName", "string", typeof challengerName))}
    const challengerRating = req.body.challengerRating;
    if(!challengerRating) {errors.push(missingParam("challengerRating"))}
    else if (typeof challengerRating !== "number") {errors.push(invalidParamType("challengerRating", "number", typeof challengerRating))}
    if (errors.length > 0) {
        return res.status(400).json({errors});
    }
    next();
}

export default challengeBodyValidation;