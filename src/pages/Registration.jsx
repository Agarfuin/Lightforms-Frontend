import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//Styles
import "../assets/styles/registration.scss";

//Assets
import Background from "../assets/images/wide_logo.jpg";

const Registration = () => {
  const navigate = useNavigate();
  const [swapPanel, setSwapPanel] = useState(false);
  const baseURL = "http://lightweight-final-env.eba-ernvgd6q.eu-west-1.elasticbeanstalk.com/api/auth/";

  const [registrationData, setRegistrationData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignUp = (e) => {
    e.preventDefault();
    if (registrationData.confirmPassword === registrationData.password) {
      const tempData = {
        name: registrationData.name,
        email: registrationData.email,
        password: registrationData.password,
      };

      fetch(`${baseURL}signup`, {
        method: "POST",
        body: JSON.stringify(tempData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          /* if (data.success) {
            navigate("/dashboard")
          } */
        });
    } else {
      alert("Passwords do not match");
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const tempData = {
      email: registrationData.email,
      password: registrationData.password,
    };
    fetch(`${baseURL}login`, {
      method: "POST",
      body: JSON.stringify(tempData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        /* if (data.success) {
            navigate("/dashboard")
          } */
      });
  };

  const signUpButton = () => {
    setSwapPanel(true);
  };
  const signInButton = () => {
    setSwapPanel(false);
  };

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) {
      navigate("/dashboard");
    } else {
      navigate("/registration");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(registrationData);
  }, [registrationData]);

  return (
    <main id="registration">
      <div className="background">
        <img src={Background} alt="bg" />
      </div>
      <div className="registration-container">
        <div
          className={`sign-up-container ${
            swapPanel ? `right-panel-active` : ``
          }`}
        >
          <form onSubmit={handleSignUp}>
            <h2>Sign Up</h2>
            <div className="form-input">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="John"
                onChange={(e) => {
                  setRegistrationData({
                    ...registrationData,
                    name: e.target.value,
                  });
                }}
                required
              />
            </div>
            <div className="form-input">
              <label htmlFor="signUp-email">E-Mail</label>
              <input
                type="email"
                id="signUp-email"
                placeholder="example@mail.com"
                onChange={(e) => {
                  setRegistrationData({
                    ...registrationData,
                    email: e.target.value,
                  });
                }}
                required
              />
            </div>
            <div className="form-input">
              <label htmlFor="signUp-password">Password</label>
              <input
                type="password"
                id="signUp-password"
                onChange={(e) => {
                  setRegistrationData({
                    ...registrationData,
                    password: e.target.value,
                  });
                }}
                required
              />
            </div>

            <div className="form-input">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                onChange={(e) => {
                  setRegistrationData({
                    ...registrationData,
                    confirmPassword: e.target.value,
                  });
                }}
                required
              />
            </div>
            <button type="submit">SIGN UP</button>
          </form>
        </div>

        <div
          className={`sign-in-container ${
            swapPanel ? `right-panel-active` : ``
          }`}
        >
          <form onSubmit={handleSignIn}>
            <h2>Sign In</h2>
            <div className="form-input">
              <label htmlFor="signIn-email">E-Mail</label>
              <input
                type="email"
                id="signIn-email"
                placeholder="example@mail.com"
                onChange={(e) => {
                  setRegistrationData({
                    ...registrationData,
                    email: e.target.value,
                  });
                }}
                required
              />
            </div>
            <div className="form-input">
              <label htmlFor="signIn-password">Password</label>
              <input
                type="password"
                id="signIn-password"
                onChange={(e) => {
                  setRegistrationData({
                    ...registrationData,
                    password: e.target.value,
                  });
                }}
                required
              />
            </div>
            <button type="submit">SIGN IN</button>
          </form>
        </div>

        <div
          className={`overlay-container ${
            swapPanel ? `right-panel-active` : ``
          }`}
        >
          <div className={`overlay ${swapPanel ? `right-panel-active` : ``}`}>
            <div
              className={`overlay-panel overlay-left ${
                swapPanel ? `right-panel-active` : ``
              }`}
            >
              <h1>Already have an account?</h1>
              <button className="ghost" id="signIn" onClick={signInButton}>
                SIGN IN
              </button>
            </div>

            <div
              className={`overlay-panel overlay-right ${
                swapPanel ? `right-panel-active` : ``
              }`}
            >
              <h1>Don't have an account?</h1>
              <button className="ghost" id="signUp" onClick={signUpButton}>
                SIGN UP
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Registration;