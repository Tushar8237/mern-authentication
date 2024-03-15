import React from "react";
import "./About.scss";

export default function About() {
  return (
    <main className="about_wrapper">
      <section className="about_section">
        <div className="about_content_wrapper">
          <h1>MERN AUTHENTICATION</h1>
          <p>
            The MERN (MongoDB, Express.js, React.js, Node.js) authentication
            project with Firebase Google login is a web application that
            provides user authentication functionalities using the MERN stack
            along with Firebase Authentication's Google login feature.
          </p>

          <p>Here's a brief summary of the project:</p>

          <h2>Technology Stack:</h2>

          <ul>
            <li>MongoDB: For database storage.</li>
            <li>Express.js: To handle server-side logic and routing.</li>
            <li>React.js: For building the user interface.</li>
            <li>Node.js: To run server-side JavaScript code.</li>
            <li>
              Firebase Authentication: To manage user authentication, with
              Google login integration.
            </li>
          </ul>

          <p>
            Error handling is a critical aspect of the project, ensuring that
            any unexpected errors or exceptions are gracefully managed and
            communicated to the user. This includes handling authentication
            errors, database errors, and any other potential issues that may
            arise during the application's operation.
          </p>

          <p>
            Overall, the MERN authentication project with Firebase Google login
            provides a secure, scalable, and customizable solution for
            implementing user authentication in web applications.
          </p>
        </div>
      </section>
    </main>
  );
}
