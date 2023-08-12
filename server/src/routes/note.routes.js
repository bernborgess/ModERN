import { Router } from "express";
import NoteController from "../controllers/NoteController.js";

const noteRoutes = Router();

const noteController = new NoteController();

noteRoutes.post("/:user_id", noteController.create);
noteRoutes.get("/", noteController.index);
noteRoutes.get("/:id", noteController.show);

export default noteRoutes;