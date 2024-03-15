import User from '../models/user.model.js'
import { errorHandler } from './../utils/error.js';
import bcryptjs from 'bcryptjs'

// update user
// export const updateUser = async (req, res, next) => {
//     if(req.user.id !== req.params.id){
//         return next(errorHandler(401, "You can update only your account!"))
//     }
//     try {
//         if(req.body.password){
//             req.body.password = bcryptjs.hashSync(req.body.password, 10)
//         }

//         const updateUser = await User.findByIdAndUpdate(
//             req.params.id, {
//                 $set: {
//                     username: req.body.username,
//                     email: req.body.email,
//                     password: req.body.password,
//                     profilePicture: req.body.profilePicture
//                 }
//             }, 
//             {new: true}
//         );
//         const {password, ...rest} = updateUser._doc
//         res.status(200)
//         .json(rest)
//     } catch (error) {
//         next(error)
//     }
// }

export const updateUser = async (req, res, next) => {
    if(req.user.id !== req.params.id){
        return next(errorHandler(401, "You can update only your account!"))
    }
    try {
        const existingUser = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] });

        if (existingUser && existingUser._id.toString() !== req.params.id) {
            // If the username or email already exists for another user
            return next(errorHandler(409, "Username or email already exists"));
        }

        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }

        const updateUser = await User.findByIdAndUpdate(
            req.params.id, {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture
                }
            }, 
            { new: true }
        );

        if (!updateUser) {
            return next(errorHandler(404, "User not found"));
        }

        const { password, ...rest } = updateUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}


export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return res.status(401).json({ success: false, message: "You can delete only your account" });
    }
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "User has been deleted successfully" });
    } catch (error) {
        next(error);
    }
};
