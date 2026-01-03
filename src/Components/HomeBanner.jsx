import React from 'react'
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './FirebaseConfig';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import languagesText from "../api/Language";

const HomeBanner = ({ lang = "en" }) => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/register", {
      state: { email: email.trim() },
    });
  };

  const text = languagesText?.[lang];

  return (
    <section className="home-banner">
      {/* overlay */}
      <div className="home-overlay"></div>

      {/* content */}
      <div className="our-story">
        <div className="our-story-content">
          <h1 className="our-story-card-title">
            {text?.title}
          </h1>

          <h2 className="our-story-card-subtitle">
            {text?.subtitle}
          </h2>

          <p className="email-form-title">
            {text?.description}
          </p>

          <div className="input-group">
            {/* optional email */}
            {/* <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /> */}

            <button
              className="get-started-btn"
              onClick={handleGetStarted}
            >
              {text?.button}
            </button>
          </div>
        </div>
      </div>

      {/* background image */}
      <img
        className="banner-img"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/6e32b96a-d4be-4e44-a19b-1bd2d2279b51/ee068656-14b9-4821-89b4-53b4937d9f1c/IN-en-20220516-popsignuptwoweeks-perspective_alpha_website_small.jpg"
        alt="Netflix background"
      />
    </section>
  );
};

export default HomeBanner;
