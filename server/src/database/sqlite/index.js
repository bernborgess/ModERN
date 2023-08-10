import path from "path";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { fileURLToPath } from "url";

export async function sqliteConnection() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const database = await open({
        filename: path.resolve(
            __dirname,
            "..",
            "database.db"
        )
        ,
        driver: sqlite3.Database
    });
    return database;
}