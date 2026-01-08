import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword} from "firebase/auth";
import { firebaseConfig } from "./FirebaseConfig";
import languagesText from "../api/Language";

const Login = ({lang}) => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const navigate = useNavigate();
  const location = useLocation();

  const page = location.pathname === "/login" ? true : false;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isUserExist, setUserExist] = useState(false);
  const [isEmailUsed, setIsEmailUsed] = useState(false);

  const [emailvalid, setEmailValid] = useState(true);
  const [passwordvalid, setPasswordValid] = useState(true);

  const validation = (fieldName, value) => {
    switch (fieldName) {
      case "email":
        return value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      case "password":
        return value.length >= 6;
      default:
        return false;
    }
  };

  const ctaClickHandler = (e) => {
    e.preventDefault();

    if (!validation("email", email) || !validation("password", password)) {
      setEmailValid(validation("email", email));
      setPasswordValid(validation("password", password));
      return;
    }

    if (page) {
      // LOGIN
      signInWithEmailAndPassword(auth, email, password)
        .then((auth) => {
          if (auth) {
            navigate("/dashboard");
          }
        })
        .catch(() => setUserExist(true));
    } else {
      // REGISTER
      createUserWithEmailAndPassword(auth, email, password)
        .then((auth) => {
          if (auth) {
            navigate("/dashboard");
          }
        })
        .catch(() => setIsEmailUsed(true));
    }
  };

  useEffect(() => {
    setUserExist(false);
    setIsEmailUsed(false);
  }, [location]);

  const emailOnChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordOnChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="login">
      <div className="holder ">
        <h1 className="text-white">{page ? languagesText[lang].loginTitle : languagesText[lang].registerTitle}</h1>
        <br />

        <form>
          <input
            className="form-control"
            autoComplete="off"
            value={email}
            onChange={emailOnChangeHandler}
            type="email"
            placeholder={languagesText[lang].email}
          />

          {!emailvalid && (
            <p className="text-danger">Email is invalid/blank</p>
          )}

          <input
            className="form-control"
            autoComplete="new-password"
            value={password}
            onChange={passwordOnChangeHandler}
            type="password"
            placeholder={languagesText[lang].password}
          />

          {!passwordvalid && (
            <p className="text-danger">Password is invalid/blank</p>
          )}

          <button
            className="btn btn-danger btn-block"
            type="submit"
            onClick={ctaClickHandler}
          >
            {page ? languagesText[lang].signIn : languagesText[lang].registerTitle}
          </button>

          <br />

          {page && (
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
              />
              <label
                className="form-check-label text-white"
                htmlFor="flexCheckDefault"
              >
               {languagesText[lang].rememberMe}
              </label>
            </div>
          )}
        </form>

        <br />
        <br />

        {isUserExist && (
          <p className="text-danger">
           {languagesText[lang].userNotExist}
          </p>
        )}

        {isEmailUsed && (
          <p className="text-danger">
          {languagesText[lang].emailUsed}
          </p>
        )}

        <div className="login-form-other">
          <div className="login-signup-now">
            {page ? languagesText[lang].newToNetflix : languagesText[lang].existingUser} &nbsp;
            <Link to={page ? "/register" : "/login"}>
              {page ? languagesText[lang].signUpNow : languagesText[lang].signIn}
            </Link>
          </div>
        </div>
      </div>

      <div className="shadow"></div>

      <img
        className="concord-img vlv-creative"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/6e32b96a-d4be-4e44-a19b-1bd2d2279b51/ee068656-14b9-4821-89b4-53b4937d9f1c/IN-en-20220516-popsignuptwoweeks-perspective_alpha_website_small.jpg"
        alt=""
      />
    </div>
  );
};

export default Login;

