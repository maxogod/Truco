import { Request, Response } from "express";
import { addWinOrLossService, updateRatingService,topRatingService } from "../services/statsService";

const addWinController = async (req: Request, res: Response) => {
    if (!req.session.user) return res.status(401).send("Unauthorized");
    const updated = await addWinOrLossService(req.session.user.username, true);
    if (!updated) return res.status(500).send("Internal server error");
    const { myRating,opponentRating } = req.body;
    if(!myRating || !opponentRating) return res.status(400).send("Bad request");
    const updatedRating = await updateRatingService(req.session.user.username,true, myRating, opponentRating);
    if (!updatedRating) return res.status(500).send("Internal server error");

    return res.status(200).send({updatedRating});
}

const addLossController = async (req: Request, res: Response) => {
    if (!req.session.user) return res.status(401).send("Unauthorized");

    const updated = await addWinOrLossService(req.session.user.username, false);
    if (!updated) return res.status(500).send("Internal server error");
    const { myRating,opponentRating } = req.body;
    const updatedRating = await updateRatingService(req.session.user.username,false, myRating, opponentRating);
    if (!updatedRating) return res.status(500).send("Internal server error");

    return res.status(200).send({updatedRating});
}

const getTopRatingController = async (req: Request, res: Response) => {
    const topUsers = await topRatingService();
    return res.status(200).json(topUsers);

}


export {
    addWinController,
    addLossController,
    getTopRatingController
};