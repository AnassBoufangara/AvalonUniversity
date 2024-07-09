import jwt from "jsonwebtoken";
import { createErrorHandling } from "./errors.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token) return next(createErrorHandling(401, "You are not Authenticated!"));

    // Verify if the token is valid or not
    jwt.verify(token, process.env.JWT, (err, user) => {
        if(err) return next(createErrorHandling(403, "Token is not Valid!"));

        console.log(user);
        console.log(user.id);
        req.user = user;   //Now we can use this 'user' in any API we wants
        next(); //After verification, continue from we left.
    });
}

