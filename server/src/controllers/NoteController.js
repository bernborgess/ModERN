
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
        const { user_id, title, tags } = request.query;


        if (tags) {
            const filteredTags = tags.split(",")
                .map(tag => tag.trim());

            const notes = await knex("tags")
                .select([
                    "notes.id",
                    "notes.title",
                    "notes.user_id",
                ])
                .where("notes.user_id", user_id)
                .whereLike("notes.title", `%${title}%`)
                .whereIn("name", filteredTags)
                .innerJoin("notes", "notes.id", "tags.note_id")
                .orderBy("title");

            return response.json(notes);
        }

        const notes = await knex("notes")
            .where({ user_id })
            .whereLike("title", `%${title}%`)
            .orderBy("title");
        return response.json(notes);
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

    async delete(request, response) {
        const { id } = request.params;
        await knex("notes").where({ id }).delete();
        return response.json();
    }
}