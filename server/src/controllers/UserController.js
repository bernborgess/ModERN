import bcrypt from "bcryptjs";
import AppError from "../utils/AppError.js";

import { sqliteConnection } from "../database/sqlite/index.js";

class UserController {
    /**
    * index - GET
    * show - GET specific
    * create - POST creates register
    * update - PUT
    * delete - DELETE removes a register
    */
    async create(req, res) {
        const { name, email, password } = req.body;
        if (!name) {
            throw new AppError("Nome é obrigatório");
        }

        const database = await sqliteConnection();

        const checkUserExists = await database.get(
            "SELECT * FROM users WHERE email = (?)", [email]);

        if (checkUserExists) {
            throw new AppError("Este email ja esta em uso.");
        }

        const hashedPassword = await bcrypt.hash(password, 8);

        await database.run(
            "INSERT INTO users (name,email,password) VALUES (?,?,?)",
            [name, email, hashedPassword]);

        res.status(201).json();
    }

}

export default UserController;