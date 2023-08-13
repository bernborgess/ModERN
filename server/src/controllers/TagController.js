import { connection as knex } from "../database/knex/index.js";

export default class TagController {

    async index(request, response) {
        const { user_id } = request.params;

        const tags = await knex("tags")
            .where({ user_id });
        return response.json(tags);
    }
}