import { Request, Response } from "express";
import { addWinOrLossService, updateRatingService } from "../services/statsService";

const addWinController = async (req: Request, res: Response) => {
    if (!req.session.user) return res.status(401).send("Unauthorized");

    const updated = await addWinOrLossService(req.session.user.username, true);
    if (!updated) return res.status(500).send("Internal server error");

    return res.status(200).send("OK");
}

const addLossController = async (req: Request, res: Response) => {
    if (!req.session.user) return res.status(401).send("Unauthorized");

    const updated = await addWinOrLossService(req.session.user.username, false);
    if (!updated) return res.status(500).send("Internal server error");

    return res.status(200).send("OK");
}

const updateRatingController = async (req: Request, res: Response) => {
    if (!req.session.user) return res.status(401).send("Unauthorized");

    const { ratingDifferential } = req.body;
    if (!ratingDifferential) return res.status(400).send("Bad request");

    const updated = await updateRatingService(req.session.user.username, ratingDifferential);
    if (!updated) return res.status(500).send("Internal server error");

    return res.status(200).send("OK");

}

export {
    addWinController,
    addLossController,
    updateRatingController,
};