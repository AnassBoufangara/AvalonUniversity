import { createErrorHandling } from "../errors.js";
import Lecture from "../models/lectures.js"


export const addLecture = async (req, res, next) => {
    const newLecture = new Lecture({lecturer: req.user.id, ...req.body});
    console.log(newLecture);
    try {
        const savedLecture = await newLecture.save();
        console.log(savedLecture);
        res.status(200).json(savedLecture);
    } catch(err) {
        next(err);
    }
}


export const updateLecture = async (req, res, next) => {
    try{
        const lecture = await Lecture.findById(req.params.id);
        if(!lecture) return next(createErrorHandling(404, "Lecture not Found!"));
        if(req.user.id == lecture.lecturer) {
            const updatedLecture = await Lecture.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {new: true}
            );
            res.status(200).json(updatedLecture);
        } else {
            return next(createErrorHandling(404, "Permission Denied!"));
        }
    } catch(err) {
        next(err);
    }
}

export const deleteLecture = async (req, res, next) => {
    try{
        const lecture = await Lecture.findById(req.params.id);
        if(!lecture) return next(createErrorHandling(404, "Lecture not Found!"));
        if(req.user.id == lecture.lecturer) {
            await Lecture.findByIdAndDelete(req.params.id);
            res.status(200).json("The Lecture had been deleted!");
        } else {
            return next(createErrorHandling(404, "Permission Denied!"));
        }
    } catch(err) {
        next(err);
    }
}

//--> Get Specific lecture
export const getLecture = async (req, res, next) => {
    try{
        const lecture = await Lecture.findById(req.params.id);
        res.status(200).json(lecture);
    } catch(err) {
        next(err);
    }
}

//--> Get all the lectures
export const getLectures = async (req, res, next) => {
    try{
        const lectures = await Lecture.find();
        res.status(200).json(lectures);
    } catch(err) {
        next(err);
    }
}
