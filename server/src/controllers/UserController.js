import AppError from "../utils/AppError.js";

class UserController {
    /**
  * index - GET
  * show - GET specific
  * create - POST creates register
  * update - PUT
  * delete - DELETE removes a register
  */
    create(req, res) {
        const { name, email, password } = req.body;
        if (!name) {
            throw new AppError("Nome é obrigatório");
        }
        res.status(201).json({ name, email, password });
    }

}

export default UserController;