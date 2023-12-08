import { Router } from "express";
import { acceptFriendRequestController, sendFriendRequestController } from "../controllers/friendsController";

const router = Router();

router.get("/friendRequest/:targetUsername", sendFriendRequestController);

router.get("/acceptFriendRequest/:targetUsername", acceptFriendRequestController);

export default router;