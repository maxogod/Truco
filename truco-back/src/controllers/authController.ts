import User from "../models/User";
import { Request, Response } from "express";
import { authenticateUser, createUser, getUser } from "../services/authService";
import { destroySession } from "../services/sessionService";

const registerController = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const newUser = await createUser(username, password);

    if (!newUser) {
        return res.status(500).send("Error creating user");
    }

    req.session.user = newUser;

    res.cookie("qid", req.sessionID, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        sameSite: "none",
        secure: true,
    });

    // await User.populate(newUser, "friends"); TODO is it necessary?

    res.status(201).send(newUser);
}

const loginController = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await authenticateUser(username, password);

    if (!user) {
        return res.status(401).send("Wrong username or password");
    }

    req.session.user = user;

    res.cookie("qid", req.sessionID, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        sameSite: "none",
        secure: true,
    });

    // await User.populate(user, "friends");

    res.status(200).send(user);
}

const logoutController = async (req: Request, res: Response) => {
    if (!req.session.user) return res.status(401).send("Not logged in");

    req.session.destroy((err) => {
        if (err) return res.status(500).send("Internal Server Error");
        destroySession(req.cookies.qid);
        res.clearCookie("qid");
        res.status(200).send("Logged out");
    });
}

const sessionController = async (req: Request, res: Response) => {
    if (!req.session.user) return res.status(401).send("Not logged in");

    const user = await getUser(req.session.user.username);

    return res.status(200).send(user);
}

export {
    registerController,
    loginController,
    logoutController,
    sessionController,
}