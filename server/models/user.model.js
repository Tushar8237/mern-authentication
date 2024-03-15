import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type : String,
        require : true,
        unique: true
    },
    email : {
        type : String,
        require : true,
        unique: true
    },
    password : {
        type : String,
        require : true,
    },
    profilePicture: {
        type: String,
        default: "https://preview.keenthemes.com/metronic-v4/theme_rtl/assets/pages/media/profile/profile_user.jpg"
    }
}, {timestamps : true})

const User = mongoose.model('User', userSchema)

export default User