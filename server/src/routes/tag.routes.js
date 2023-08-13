import { Router } from "express";
import TagController from "../controllers/TagController.js";

const tagRoutes = Router();

const tagController = new TagController();

tagRoutes.get("/:user_id", tagController.index);

export default tagRoutes;