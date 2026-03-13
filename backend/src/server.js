import express from "express";
import notesRoutes from "./routes/notesRoutes.js"
const app = express()

app.use("/api/notes", notesRoutes);

// An endpoint is a combination of url + http method that lets the client
// interact with a specific resource


app.listen(5001, () => {
    console.log("Server started")
});