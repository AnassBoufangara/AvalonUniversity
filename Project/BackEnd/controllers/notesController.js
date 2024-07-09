import { createErrorHandling } from "../errors.js";
import Lecture from "../models/lectures.js";
import Note from "../models/notes.js"


export const addNote = async (req, res, next) => {
    try {
        console.log(req.user.id);
        const newNote = new Note({student: req.user.id, ...req.body});
        console.log(newNote);
        const savedNote = await newNote.save();
        res.status(200).json(savedNote);
    } catch(err) {
        next(err);
    }
}

export const getNotes = async (req, res, next) => {
    try {
        console.log(req.user.id);    //'id' giving ERROR
        console.log("Access for notes");
        const notes = await Note.find({ lecture: req.params.lectureId, student: req.user.id });
        res.status(200).json(notes);
    } catch(err) {
        console.log("---- Error User")
        next(err);
    }
}


export const updateNote = async (req, res, next) => {
    try {

    } catch(err) {
        next(err);
    }
}

export const deleteNote = async (req, res, next) => {
    try {
        const note = await Note.findById(req.params.id);
        //const lecture = await Lecture.findById(res.params.id);
        //console.log("--- Start ID");
        //console.log(note.student.toString());
        //console.log(req.user.id);

        if (req.user.id === note.student.toString()) {
          await Note.findByIdAndDelete(req.params.id);
          res.status(200).json("Note has been deleted.");
        } else {
          return next(createErrorHandling(403, "Permission Denied!"));
        }
    } catch(err) {
        next(err);
    }
}