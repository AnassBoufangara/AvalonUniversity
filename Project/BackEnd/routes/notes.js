import express from "express";
import { addNote, deleteNote, getNotes, updateNote } from "../controllers/notesController.js";
import { verifyToken } from "../verifyToken.js";


const router = express.Router();

router.post("/", verifyToken, addNote);
router.get("/:lectureId", verifyToken, getNotes);
router.put("/:id", verifyToken, updateNote);
router.delete("/:id", verifyToken, deleteNote);




export default router;