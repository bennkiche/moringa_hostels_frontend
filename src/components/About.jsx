import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import "./About.css"; // Import the CSS file

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-image">
          <img src="src/assets/images/New Moringa.webp" alt="Moringa Hostels" />
        </div>

        <div className="about-text">
          <h1>About Moringa Hostels</h1>
          <p>
            Welcome to <strong>Moringa Hostels</strong>, a place where <span className="highlight">comfort meets convenience</span>.
            Our hostel is designed to provide students and professionals with a secure, 
            affordable, and vibrant living environment.
          </p>
          <p className="description">
            Experience a home away from home with top-tier facilities, fast Wi-Fi, and a welcoming community.
          </p>
          
          <Link to="/contacts" className="contact-button">
            Get in Touch
          </Link>
        </div>
      </div>

      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default About;
