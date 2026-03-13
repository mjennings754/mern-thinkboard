import express from "express";
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

app.use(cors({
    origin: "http://localhost:5173",
}));
// middleware allows us to get access to the title, content (we send as JSON)
app.use(express.json()); // parse JSON bodies: req.body
app.use(rateLimiter);

app.use((req, res, next) => {
    console.log(`Request method is ${req.method} & Request URL is ${req.url}`);
    next();
});

app.use("/api/notes", notesRoutes);

// An endpoint is a combination of url + http method that lets the client
// interact with a specific resource

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT:", PORT)
    });
});
