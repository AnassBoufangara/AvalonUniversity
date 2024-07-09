// lecture.js
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const lectureSchema = new Schema(
    {
        title: { 
            type: String, 
            required: true 
        },
        lecturer: { 
            type: Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
        desc : {
            type: String,
            required: true
        },
        imgUrl: {
            type: String,
            required: true
        },
        videoUrl: {
            type: String,
            required: true
        }
    },
    {timestamps: true}
);

export default model('Lecture', lectureSchema);
