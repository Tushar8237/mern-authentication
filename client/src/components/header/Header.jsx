import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user)
  
  return (
    <main className="header_wrapper">
      <section className="header_section">
        <div className="header_left">
          {currentUser ? (
            <Link to="/" className="header_logo">
              <h2>MERN AUTH</h2>
            </Link>
          ) : (
            <h2 className="header_title">MERN AUTH</h2>
          )}
        </div>
        <div className="header_right">
          {currentUser ? (
            <>
              <Link className="header_link" to="/">
                <p>Home</p>
              </Link>
              <Link className="header_link" to="/about">
                <p>About</p>
              </Link>
              <Link className="header_link" to="/profile">
                <p>Profile</p>
              </Link>
            </>
          ) : (
            <>
              <Link className="header_link" to="/sign-in"> 
                <p>Sign in</p>
              </Link>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
