import express from "express";
import dotenv from "dotenv";
import { sql } from "./config/db.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

async function initDB() {
    try {
        await sql`CREATE TABLE IF NOT EXISTS transactions(
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            amount DECIMAL(10,2) NOT NULL,
            category VARCHAR(255) NOT NULL,
            created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`;
        // DECIMAL (10,2)
        // means: a fixed-point number with:
        // 10 digits total
        // 2 digits after the decimal point
        // so: the max value it can store is 99999999.99 (8 digits before the decimal, 2 after)
        
        console.log("Database initialized successfully!");
    } catch (error) {
        console.log("Error initializing DB", error);
        process.exit(1) // status code 1 = failure, 0 = success
    }
}

app.get("/", (req, res) => {
    res.send("Hello World!");
});


initDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is up and running on PORT:", PORT);
    });
});
