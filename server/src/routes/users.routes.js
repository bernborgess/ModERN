import { Router } from "express";


const userRoutes = Router();

userRoutes.post("/", (req, res) => {
    const { name, email, password } = req.body;

    res.json({ name, email, password });
});

export default userRoutes;