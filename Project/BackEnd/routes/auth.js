import express from "express";
import { signIn, signUp } from "../controllers/authController.js";


const router = express.Router();

//-----> Create User (No need for this step, we can do it in MongoDB)
router.post("/signUp", signUp);


router.post("/signIn", signIn);


export default router;