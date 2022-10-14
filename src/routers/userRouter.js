import { Router } from "express";
import tokenValidations from "../middlewares/authMiddleware.js";
import { getUserInfo, getRanking } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/users/me", tokenValidations, getUserInfo);
userRouter.get("/ranking", getRanking);

export default userRouter;
