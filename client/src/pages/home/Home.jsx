import React from "react";
import "./Home.scss";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const notify = () => toast("Wow so easy!");
  return (
    <main className="home_wrapper">
      <section className="home_section">
        Home page
        <button onClick={notify}>Notify!</button> 
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
      </section>
    </main>
  );
}