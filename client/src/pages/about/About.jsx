import React from 'react'
import './About.scss'

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
        </div>
      </section>
    </main>
  )
}
