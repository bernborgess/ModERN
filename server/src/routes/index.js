import { Router } from "express";
import userRoutes from "./users.routes.js";

const routes = Router();

routes.use("/user", userRoutes);

export default routes;