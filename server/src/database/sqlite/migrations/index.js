import sqliteConnection from "../index.js";
import createUsers from "./createUsers.js";

export default async function runMigration() {
    const schemas = [
        createUsers
    ].join("");

    sqliteConnection()
        .then(db => db.exec(schemas))
        .catch(error => console.error(error));
}