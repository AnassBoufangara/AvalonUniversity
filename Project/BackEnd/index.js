import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors';

import userRoutes from "./routes/users.js";
import lectureRoutes from "./routes/lectures.js";
import noteRoutes from "./routes/notes.js";
import authRoutes from "./routes/auth.js";


const app = express();
dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      throw err;
    });
};


//
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

//Allow using CookieParser
app.use(cookieParser());

// Allow app to take JSON data from outside
app.use(express.json());

// Testing
app.use("/api/notes", noteRoutes);
app.use("/api/lectures", lectureRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// //------> Middlewares
// app.use(cookieParser());  // Allow the app to use 'Cookies'
// app.use(express.json());  //Allow the app to take 'JSON' data from Outside
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/videos", videoRoutes);
// app.use("/api/comments", commentRoutes);

// //------>Middleware for Error handler in Express-Server
//- This is a Middleware that takes 4 parameters (err, req, res, next)
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(8800, () => {
  connect();
  console.log("Connected to Server");
});
