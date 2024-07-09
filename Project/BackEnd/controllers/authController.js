import mongoose from "mongoose";
import User from "../models/users.js";
import bcrypt from "bcryptjs";
import { createErrorHandling } from "../errors.js";
import jwt from "jsonwebtoken";

// Sign-Up Controller
export const signUp = async (req, res, next) => {
    console.log("Start SIgn Up!");
    try {
        //Encrypt the password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        //Create new User
        const newUser = new User({...req.body, password: hash});
        //Save user info in the database
        console.log(newUser);
        await newUser.save();
        res.status(200).send("User had been created!");
    } catch(err) {
        // Calling Error-Handling Middleware
        next(err);
    }
}



// Sign-In Controller
export const signIn = async (req, res, next) => {
    try{
        const user = await User.findOne({email: req.body.email});
        console.log(req.body.email);
        
        // Check if user excists
        if(!user) return next(createErrorHandling(404, "User Not Found!"));
        
        // Check if the encrypted password correct 
        const isCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isCorrect) return next(createErrorHandling(404, "Wrong Credentials!"));
        
        //------> Using 'JsonWebToken (JWT)' OR 'JsonAccessToken'
        //- JWTs are commonly used for authentication and information exchange in web applications. They allow servers to authenticate users without storing their credentials and can also be used to transmit data securely between parties
        //- Now we will use This 'Access Token' to check the user
        const token = jwt.sign({
            // Here we will store user-information that will help us to recognize the user.
            id: user._id
        }, process.env.JWT);

        //- Taking password off from the object, because it sensitive data, to send the object in cookies
        const { password, ...others } = user._doc;
        //------> Using Cookies to send the token to user
        // Here we will cookies to send the token info to user
        res.cookie("access_token", token,{
            httpOnly: false,   //Using this to not allow third-party to use this cookie.
            expires: new Date(Date.now() + 9000000)
        }).status(200).json(others);
    } catch(err) {
        next(err);
    }
}










