class UsersController {
    /**
      * index - GET
      * show - GET specific
      * create - POST creates register
      * update - PUT
      * delete - DELETE removes a register
      */
    create(req, res) {
        const { name, email, password } = req.body;

        res.json({ name, email, password });
    }

}

export default UsersController;