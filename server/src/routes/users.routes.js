import { Router } from "express";
// import UsersController from "../controllers/UsersController";


const userRoutes = Router();

userRoutes.post("/", (req, res) => {
    const { name, email, password } = req.body;
    res.json({ name, email, password });
});



// const usersController = new UsersController();

// userRoutes.post("/", usersController.create);

export default userRoutes;