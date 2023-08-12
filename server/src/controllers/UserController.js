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

        return response.status(201).json();
    }

    async update(request, response) {
        const { name, email, password, old_password } = request.body;
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

        if (name) // TODO Validate
            user.name = name;

        if (email) // TODO Validate
            user.email = email;

        if (password) {
            if (!old_password) {
                throw new AppError("Você precisa informar a senha antiga para definir a nova senha.");
            }
            const checkOldPassword = await bcrypt.compare(old_password, user.password);

            if (!checkOldPassword) {
                throw new AppError("A senha antiga não confere");
            }
            user.password = await bcrypt.hash(password, 8);
        }


        await database.run(`--sql
            UPDATE users SET
                name = ?,
                email = ?,
                password = ?,
                updated_at = DATETIME('now')
            WHERE id = ?` , [
            user.name,
            user.email,
            user.password,
            id
        ]);

        return response.json();
    }

    async index(request, response) {
        const database = await sqliteConnection();
        const users = await database.
            get("SELECT * FROM users");
        if (Array.isArray(users))
            console.log(users);
        return response.json({ users });
    }

}

export default UserController;