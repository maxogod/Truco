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

    // send evything except password
    res.status(201).send({
        _id: newUser._id,
        username: newUser.username,
        rating: newUser.rating,
        wins: newUser.wins,
        losses: newUser.losses,
        friends: newUser.friends,
        friendRequests: newUser.friendRequests,
        created_at: newUser.createdAt,
        updated_at: newUser.updatedAt,
    });
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

    await User.populate(user, "friends");
    await User.populate(user, "friendRequests");

    res.status(200).send({
        _id: user._id,
        username: user.username,
        rating: user.rating,
        wins: user.wins,
        losses: user.losses,
        friends: user.friends,
        friendRequests: user.friendRequests,
        created_at: user.createdAt,
        updated_at: user.updatedAt,
    });
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
    if (!user) return res.status(500).send("Internal Server Error");

    await User.populate(user, "friends");
    await User.populate(user, "friendRequests");

    return res.status(200).send({
        _id: user._id,
        username: user.username,
        rating: user.rating,
        wins: user.wins,
        losses: user.losses,
        friends: user.friends,
        friendRequests: user.friendRequests,
        created_at: user.createdAt,
        updated_at: user.updatedAt,
    });
}

export {
    registerController,
    loginController,
    logoutController,
    sessionController,
}