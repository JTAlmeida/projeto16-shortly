import { Router } from "express";
import signUpValidation from "../middlewares/signUpValidation.js";
import signInValidation from "../middlewares/signInValidation.js";
import { signUp, signIn } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/signup", signUpValidation, signUp);
authRouter.post("/signin", signInValidation, signIn);

export default authRouter;