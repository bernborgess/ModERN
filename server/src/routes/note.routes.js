import { Router } from "express";
import NoteController from "../controllers/NoteController.js";

const noteRoutes = Router();

const noteController = new NoteController();

noteRoutes.post("/:user_id", noteController.create);

export default noteRoutes;