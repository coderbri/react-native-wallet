import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionsRoute from "./routes/transactionsRoute.js";

dotenv.config();

const app = express();

// Apply rate limiting before all routes
app.use(rateLimiter);
// Built-in middleware to parse incoming JSON payloads
app.use(express.json());

// Custom middleware to test implementation
// app.use((req,res,next) => {
//     console.log(">> Hey! We hit a request! The method is", req.method);
//     next();  // Pass control to the next middleware or route
// });

const PORT = process.env.PORT || 5001;


// Example route: upon page refresh, the custom middleware created will show.
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api/transactions", transactionsRoute);

initDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is up and running on PORT:", PORT);
    });
});
