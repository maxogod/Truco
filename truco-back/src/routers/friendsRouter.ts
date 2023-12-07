import { Router } from "express";
import { logoutController, } from "../controllers/authController";
import { sendFriendRequestController } from "../controllers/friendsController";

const router = Router();

router.get("/friendRequest/:targetUsername", sendFriendRequestController);

export default router;