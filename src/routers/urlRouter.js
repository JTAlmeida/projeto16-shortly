import { Router } from "express";
import tokenValidations from "../middlewares/authMiddleware.js";
import urlValidation from "../middlewares/urlValidation.js";
import { urlShortener, getUrl, openUrl, deleteUrl } from "../controllers/urlController.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", tokenValidations, urlValidation, urlShortener);
urlRouter.get("/urls/:id", getUrl);
urlRouter.get("/urls/open/:shortUrl", openUrl);
urlRouter.delete("/urls/:id", tokenValidations, deleteUrl);

export default urlRouter;
