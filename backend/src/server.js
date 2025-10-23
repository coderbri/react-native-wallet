import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

import transactionsRoute from "./routes/transactionsRoute.js";
import job from "./config/cron.js";

dotenv.config();

const app = express();

if (process.env.NODE_ENV==="production") (job.start());

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


// Health check endpoint
app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

app.use("/api/transactions", transactionsRoute);

initDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is up and running on PORT:", PORT);
    });
});
