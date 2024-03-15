import React, { useState } from "react";
import "../Auth.scss";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import OAuth from "../../../components/o-auth/OAuth";
import { toast } from "react-toastify";

export default function SignUp() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    const navigate = useNavigate()

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(false);
            // Check if form fields are empty
            if (formData.username.trim() === "" || formData.email.trim() === "" || formData.password.trim() === "") {
                setErrorMessage("Form fields cannot be empty");
                return;
            }
            const response = await axios.post('/api/auth/signup', {
                username: formData.username,
                email: formData.email,
                password: formData.password
            });
            if (response.data.success === false) {
                setError(true);
                return;
            }
           navigate("/sign-in");
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                if (status === 400) {
                    toast.error(data.message);
                } else {
                    toast.error("An error occurred. Please try again later.");
                }
                setErrorMessage(data);
            } else if (error.request) {
                toast.error("No response received from the server.");
            } else {
                toast.error("An unexpected error occurred.");
            }
            toast("create account failed");
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <main className="signin_wrapper">
            <section className="signin_section">
                <form onSubmit={handleSubmit}>
                    <h2>Create New Account</h2>
                    <label htmlFor="">User Name</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        required
                        onChange={handleInputChange}
                    />
                    <label htmlFor="">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        required
                        onChange={handleInputChange}
                    />
                    <label htmlFor="">Password</label>
                    <input
                        type="password"
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    <button className="signin_btn signin_btn-gradient-border signin_btn_glow ">
                        Submit
                    </button>
                    <OAuth />
                </form>
                <p>
                    Already have an account?{" "}
                    <Link to="/sign-in" className="signin_create_new_account">
                        Sign In
                    </Link>
                </p>
            </section>
        </main>
    );
}
