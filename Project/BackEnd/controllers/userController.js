import { createErrorHandling } from "../errors.js";
import User from "../models/users.js";

//----> Update User
export const updateUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
      try {
        console.log(req.params.id)
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }    //This part means update and get the new 'user' details to be use
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        console.log("Something Wrong!");
        next(err);
      }
    } else {
      return next(createErrorHandling(403, "Permission Denied!"));
    }
  };




//----> Delete User
export const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
          await User.findByIdAndDelete(req.params.id);
          res.status(200).json("User has been deleted.");
        } catch (err) {
          next(err);
        }
      } else {
        return next(createErrorHandling(403, "Permission Denied!"));
    }
  };

//-----> Get User
export const getUser = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };



