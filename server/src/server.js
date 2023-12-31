import express from "express";
import "express-async-errors";
import runMigration from "./database/sqlite/migrations/index.js";
import routes from "./routes/index.js";
import AppError from "./utils/AppError.js";

runMigration();

const app = express();

app.use(express.json());

app.use(routes);


app.use((error, request, response, _next) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }

    console.error(error);

    return response.status(500).json({
        status: "error",
        message: "internal server error"
    });

});

const PORT = 3333;
app.listen(PORT, () =>
    console.log(`Server is running on Port ${PORT}`)
);
