import { Router } from "express";
import pusherController from "../controllers/pusherController";
import chAuthBodyValidation from "../middlewares/pusher/chAuthBodyValidation";
import userAuthBodyValidation from "../middlewares/pusher/userAuthBodyValidation";

const router = Router();

router.post("/channel",chAuthBodyValidation,pusherController.authorizeChannel.bind(pusherController));
router.post("/user",userAuthBodyValidation,pusherController.authenticateUser.bind(pusherController));

export default router;