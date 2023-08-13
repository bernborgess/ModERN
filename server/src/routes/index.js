import { Router } from "express";
import noteRoutes from "./note.routes.js";
import tagRoutes from "./tag.routes.js";
import userRoutes from "./user.routes.js";

const routes = Router();

routes.use("/user", userRoutes);
routes.use("/note", noteRoutes);
routes.use("/tag", tagRoutes);


export default routes;