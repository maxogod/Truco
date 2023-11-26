import { Router } from "express";
import pusherController from "../controllers/pusherController";
import chAuthBodyValidation from "../middlewares/pusher/chAuthBodyValidation";

const router = Router();

router.post("/",chAuthBodyValidation,pusherController.authenticate.bind(pusherController));

export default router;