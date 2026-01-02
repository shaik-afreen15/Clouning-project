import React from 'react'
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './FirebaseConfig';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth';
import languagesText from '../api/Language';


const HomeBanner = ({lang}) => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate(); 
    

    const handleGetStarted =  ()=>{
            navigate('/register',{ state: { email: email.trim() } });
       }

  return (
      <div className="home-banner">
      <div className="our-story">
        <h1 className="our-story-card-title" data-uia="hero-title">{languagesText[lang].title}</h1>
        <h2 className="our-story-card-subtitle" data-uia="our-story-card-subtitle">{languagesText[lang].subtitle}</h2>
        <p className="email-form-title">{languagesText[lang].description}</p>
        <div className="input-group">
          {/* <input type="email" className="form-control" placeholder="Email Address" value={email} onChange={(e)=>setEmail(e.target.value)} /> */}
          <button className="input-group-button btn-danger text-white" onClick={handleGetStarted}>{languagesText[lang].button}</button>
        </div>
      </div>

      <div className="shadow"></div>
      <img className="concord-img vlv-creative" src="https://assets.nflxext.com/ffe/siteui/vlv3/6e32b96a-d4be-4e44-a19b-1bd2d2279b51/ee068656-14b9-4821-89b4-53b4937d9f1c/IN-en-20220516-popsignuptwoweeks-perspective_alpha_website_small.jpg"  alt=""></img>
    </div>
  )
}

export default HomeBanner