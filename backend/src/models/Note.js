import mongoose from "mongoose";

// 1 create schema
// create model based off schema

const noteSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    content: {
        type:String,
        required:true
    },
}, {timestamps: true}// created_at, updated_at
);

const Note = mongoose.model("Note", noteSchema)

export default Note