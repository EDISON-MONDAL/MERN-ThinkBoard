import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    }
},
{ timestamps: true } //In this way mongodb auto generate createdAt and updatedAt fields
);

const Note = mongoose.model('Note', noteSchema);

export default Note;