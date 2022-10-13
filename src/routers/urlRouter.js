import { Router } from "express";
import tokenValidations from "../middlewares/authMiddleware.js";
import urlValidation from "../middlewares/urlValidation.js";
import { urlShortener } from "../controllers/urlsController.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", tokenValidations, urlValidation, urlShortener);

export default urlRouter;
