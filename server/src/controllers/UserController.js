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
    async create(request, response) {
        const { name, email, password } = request.body;
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

        response.status(201).json();
    }

    async update(request, response) {
        const { name, email } = request.body;
        const { id } = request.params;

        const database = await sqliteConnection();
        const user = await database.get(
            "SELECT * FROM users WHERE id = (?)", [id]);

        if (!user) {
            throw new AppError("Usuário não encontrado.");
        }

        const userWithUpdatedEmail = await database.get(
            "SELECT * FROM users WHERE email = (?)", [email]);

        if (userWithUpdatedEmail &&
            userWithUpdatedEmail.id !== user.id) {
            throw new AppError(`Este email já está em uso id=${id},${userWithUpdatedEmail.id}`);
        }

        await database.run(`--sql
            UPDATE users SET
                name = ?,
                email = ?,
                updated_at = ?
            WHERE id = ?` , [
            name, email, new Date(), id
        ]);

        return response.json();
    }

}

export default UserController;