import { Router } from "express";
import { loginController, logoutController, registerController, sessionController } from "../controllers/authController";
import { loginValidation, registerValidation } from "../middlewares/authValidator";

const router = Router();

router.post("/register", registerValidation, registerController);

router.post("/login", loginValidation, loginController);

router.get("/logout", logoutController);

router.get("/session", sessionController);

export default router;