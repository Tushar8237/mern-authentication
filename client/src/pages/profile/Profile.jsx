import React, { useRef, useState, useEffect } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import "./Profile.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOut,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../../redux/user-slice/user";
import { app } from '../../firebase'

export default function Profile() {
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const dispatch = useDispatch();
  const fileRef = useRef(null);

  const { currentUser, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  console.log(error)


  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const response = await axios.post(`/api/user/update/${currentUser._id}`,formData);
      if (response.status === 409) {
        dispatch(updateUserFailure(response.data.message));
        return;
      }
      dispatch(updateUserSuccess(response.data));
      setUpdateSuccess(true);
      toast("Profile Update Successfully");
    } catch (error) {
     
      if (error.response) {
        const { status, data } = error.response;
        if (status === 409) {
          toast.error(data.message);
        } else {
          toast.error("An error occurred. Please try again later.");
        }
        dispatch(updateUserFailure(error));
      } else if (error.request) {
        toast.error("No response received from the server.");
      } else {
        toast.error("An unexpected error occurred.");
      }
      toast("Profile update failed");
    }
  };
  
  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const response = await axios.delete(
        `/api/user/delete/${currentUser._id}`
      );

      if (response.data === false) {
        dispatch(deleteUserFailure(response.data));
        return;
      }
      dispatch(deleteUserSuccess(response.data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  const handleSignOut = async () => {
    try {
      const response = await axios("api/auth/signout");
      dispatch(signOut());
      toast(response.data);
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <main className="profile_wrapper">
      <section className="profile_section">
        <form onSubmit={handleSubmit} className="profile_container">
          <h2>My Profile</h2>

          <input
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <img
            alt="profile img"
            src={
              currentUser &&
              (formData.profilePicture || currentUser.profilePicture)
            }
            onClick={() => fileRef.current.click()}
          />

          <p style={{
            marginBottom : "0.5rem"
          }}>
            {imageError ? (
              <span style={{
                color: "red"
              }}>
                Error uploading image (file size must be less than 2 MB)
              </span>
            ) : imagePercent > 0 && imagePercent < 100 ? (
              <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
            ) : imagePercent === 100 ? (
              <span style={{
                color: "white"
              }}>
                Image uploaded successfully
              </span>
            ) : (
              ""
            )}
          </p>
          <input
            type="text"
            id="username"
            placeholder="Username"
            defaultValue={currentUser.username}
            onChange={handleChange}
          />
          <input
            defaultValue={currentUser.email}
            type="email"
            id="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <button className="profile_btn profile_btn_gradient_border profile_btn_glow ">
            Update
          </button>
          <div>
            <span onClick={handleSignOut}>Sign Out</span>
            <span onClick={handleDeleteAccount}>Delete Account</span>
          </div>
        </form>
        <ToastContainer 
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
      </section>
    </main>
  );
}
