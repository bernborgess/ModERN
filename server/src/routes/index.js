import { Router } from "express";
import noteRoutes from "./note.routes.js";
import userRoutes from "./user.routes.js";

const routes = Router();

routes.use("/user", userRoutes);
routes.use("/note", noteRoutes);

export default routes;