
import { connection as knex } from "../database/knex/index.js";

export default class NoteController {
    async create(request, response) {
        const { title, description, tags, links } = request.body;
        const { user_id } = request.params;

        const [note_id] = await knex("notes").insert({
            title, description, user_id
        });

        const linksInsert = links.map(link => ({
            note_id,
            url: link
        }));

        await knex("links").insert(linksInsert);

        const tagsInsert = tags.map(name => ({
            note_id,
            name,
            user_id
        }));

        await knex("tags").insert(tagsInsert);

        return response.json();
    }

    async index(request, response) {
        const notes = await knex("notes");
        return response.json({ notes });
    }

    async show(request, response) {
        const { id } = request.params;
        const note = await knex("notes")
            .where({ id })
            .first();
        const tags = await knex("tags")
            .where({ note_id: id })
            .orderBy("name");
        const links = await knex("links")
            .where({ note_id: id })
            .orderBy("created_at");


        return response.json({
            ...note,
            tags,
            links
        });
    }
}