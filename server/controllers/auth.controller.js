import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// sign up
export const singUp = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });
    try {
        const user = await newUser.save();
        res.status(201).json({
            message: "User created successfully",
            user
        });
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            // Duplicate email error
            return res.status(400).json({
                success: false,
                message: "Email already exists."
            });
        } else if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
            // Duplicate username error
            return res.status(400).json({
                success: false,
                message: "Username already exists."
            });
        }
        // For other errors, pass to error handler middleware
        next(error);
    }
};


// sign in
export const singIn = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const validUser = await User.findOne({email})
        if(!validUser) return next(errorHandler(404, "User not found"));
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if(!validPassword) return next(errorHandler(404, "Wrong credentials"));
        const token = jwt.sign({ id : validUser._id}, process.env.JWT_SECRET);
        const { password : hashedPassword, ...rest} = validUser._doc
        const expiryDate = new Date(Date.now() + 3600000) // 1 hour
        res.cookie("access_token", token, {
            httpOnly: true,
            expiries : expiryDate
        })
        .status(200).json({
            message : "Log in successfully",
            rest
        })
    } catch (error) {
        next(error)
    }
}

// google sign
export const google = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest } = user._doc;
        const expiryDate = new Date(Date.now() + 3600000); // 1 hour
        res
          .cookie('access_token', token, {
            httpOnly: true,
            expires: expiryDate,
          })
          .status(200)
          .json(rest);
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = new User({
          username:
            req.body.name.split(' ').join('').toLowerCase() +
            Math.random().toString(36).slice(-8),
          email: req.body.email,
          password: hashedPassword,
          profilePicture: req.body.photo,
        });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        const { password: hashedPassword2, ...rest } = newUser._doc;
        const expiryDate = new Date(Date.now() + 3600000); // 1 hour
        res
          .cookie('access_token', token, {
            httpOnly: true,
            expires: expiryDate,
          })
          .status(200)
          .json(rest);
      }
    } catch (error) {
      next(error);
    }
  };


// sign out
export const signout = (req, res) => {
    res.clearCookie('access_token').status(200).json('Signout success!');
  
};
  