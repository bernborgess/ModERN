
import { connection as knex } from "../database/knex/index.js";

export default class NoteController {
    async create(request, response) {
        const { title, description, tags, links } = request.body;
        const { user_id } = request.params;

        const note_id = await knex("notes").insert({
            title, description, user_id
        });

        console.log(`note_id: ${note_id}`);
        if (Array.isArray(note_id))
            console.log(`Is array with length ${note_id.length}`)

        const real_id = note_id[0];

        const linksInsert = links.map(link => ({
            note_id: real_id,
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
}