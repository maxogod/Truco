import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import User from "../models/User";
import { destroySession } from "../services/sessionService";

const populateSession = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const qid = req.cookies.qid;
    if (!qid) return next();

    const session = await mongoose.connection.db
        .collection("sessions")
        .findOne({ _id: qid });
    if (!session) {
        destroySession(req.cookies.qid);
        res.clearCookie("qid");
        return next();
    };

    const sessionInfo = JSON.parse(session.session);

    const user = await User.findOne({ username: sessionInfo.user.username });
    if (!user) return next();
    req.session.user = user;

    next();
};

export { populateSession };