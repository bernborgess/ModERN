import knex from "knex";
import { development } from "../../../knexfile.js";

export const connection = knex(development);

