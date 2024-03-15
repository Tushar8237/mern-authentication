import React, { useState } from "react";
import "../Auth.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../../redux/user-slice/user";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import OAuth from "../../../components/o-auth/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const response = await axios.post("/api/auth/signin", {
        email: formData.email,
        password: formData.password,
      });
      if (response.data === false) {
        toast.error(response.data.message)
        dispatch(signInFailure(response.data));
        return;
      }
      dispatch(signInSuccess(response.data));
      navigate("/");

      // console.log(response.data.message)
      toast.success(response.data.message);
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    <main className="signin_wrapper">
      <section className="signin_section">
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
        <form onSubmit={handleSubmit}>
          <h2>Sign In</h2>
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
            {loading ? "Loading..." : "Sign In"}
          </button>
          <OAuth />
        </form>
        <p>
          Don't have an account?{" "}
          <Link to="/sign-up" className="signin_create_new_account">
            Create new
          </Link>
        </p>

        <p style={{
            color: "red"
        }}>
          {error ? error.message || "Something went wrong!" : ""}
        </p>
      </section>
    </main>
  );
}
