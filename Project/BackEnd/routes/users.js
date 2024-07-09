import express from "express";
import { deleteUser, getUser, updateUser } from "../controllers/userController.js";
import { verifyToken } from "../verifyToken.js";


const router = express.Router();

//- Update User  (Example)
// Use 'verifyToken' as Middleware to check if user have the right to update ot do any task
router.put("/:id", verifyToken, updateUser);

//- Delete User
router.delete("/:id", verifyToken, deleteUser);


//- Get User
router.get("/find/:id", getUser);




export default router;