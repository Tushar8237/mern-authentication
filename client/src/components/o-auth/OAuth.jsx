import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './OAuth.scss'
import { signInFailure, signInSuccess } from "../../redux/user-slice/user";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);
            const response = await axios.post("/api/auth/google", {
                name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL,
            });
            if (response.data === false) {
                toast.error(response.data.message)
                dispatch(signInFailure(response.data));
                return;
            }
            dispatch(signInSuccess(response.data));
            navigate("/");
            toast.success(response.data.message);
        } catch (error) {
            console.log("could not login with google", error);
        }
    };
    return (
        <button
            type="button"
            onClick={handleGoogleClick}
            className="signin_btn signin_btn-gradient-border signin_btn_glow "
        >
            Continue with google
        </button>
    );
}
