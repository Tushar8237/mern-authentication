import React from "react";
import "./Profile.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signOut } from "../../redux/user-slice/user";
import { useNavigate } from "react-router-dom";
import cover from "../../assets/netflix-cover.png";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      const response = await axios("api/auth/signout");
      dispatch(signOut());
      console.log(response.data);
      navigate("/sign-in");
      toast.success(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="profile_wrapper">
      <section className="profile_section">
        <form className="profile_container">
          <h2>My Profile</h2>
          <img src={cover} alt="profile img" />
          <input type="text" name="" id="" placeholder="Tushar Suryawanshi" />
          <input
            type="email"
            name=""
            id=""
            placeholder="tushar.823737@gmail.com"
          />
          <input type="password" name="" id="" placeholder="*******" />
          <button className="profile_btn profile_btn_gradient_border profile_btn_glow ">Update</button>
          <div>
            <span onClick={handleSignOut}>Sign Out</span>
            <span>Delete Account</span>
          </div>
        </form>
      </section>
    </main>
  );
}
