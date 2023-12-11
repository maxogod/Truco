import { Router } from "express";
import pusherController from "../controllers/pusherController";
import chAuthBodyValidation from "../middlewares/pusher/chAuthBodyValidation";
import userAuthBodyValidation from "../middlewares/pusher/userAuthBodyValidation";
import challengeBodyValidation from "../middlewares/pusher/challengeBodyValidation";

const router = Router();

router.post("/channel",chAuthBodyValidation,pusherController.authorizeChannel.bind(pusherController));
router.post("/user",userAuthBodyValidation,pusherController.authenticateUser.bind(pusherController));
router.post("/challenge",challengeBodyValidation,pusherController.challengeFriend.bind(pusherController));

export default router;