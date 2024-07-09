import express from "express";
import { addLecture, deleteLecture, getLecture, getLectures, updateLecture } from "../controllers/lectureController.js";
import { verifyToken } from "../verifyToken.js";


const router = express.Router();


//--> Get all the lectures
router.get("/", getLectures);


//--> Create a Lecture
router.post("/addLecture", verifyToken, addLecture);

//--> Update a Lecture
router.put("/:id", verifyToken, updateLecture);

//--> Delete a Lecture
router.delete("/:id", verifyToken, deleteLecture);

//--> Get Lacture
router.get("/find/:id", getLecture);


export default router;