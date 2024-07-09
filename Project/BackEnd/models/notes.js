// note.js
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const noteSchema = new Schema(
    {
        content: { 
            type: String, 
            required: true 
        },
        type: { 
            type: String, 
            enum: ['Video', 'Speech'], 
            required: true 
        },
        student: { 
            type: Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
        lecture: { 
            type: Schema.Types.ObjectId, 
            ref: 'Lecture', 
            required: true 
        }
    },
    { timestamps: true }
);

export default model('Note', noteSchema);
