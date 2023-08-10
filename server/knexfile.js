import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const development = {
    client: "sqlite3",
    connection: {
        filename: path.resolve(
            __dirname, "src", "database", "database.db"
        )
    },
    migrations: {
        directory: path.resolve(
            __dirname, "src", "database", "knex", "migrations"
        )
    },
    useNullAsDefault: true
};
