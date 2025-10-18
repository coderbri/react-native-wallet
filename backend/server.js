import express from "express"
import dotenv from "dotenv"

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

// connectDB(process.env.DATABASE_URL)

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log("Server is up and running on PORT:", PORT);
});