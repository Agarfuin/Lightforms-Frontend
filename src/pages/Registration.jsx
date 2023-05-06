import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//Styles
import "../assets/styles/registration.scss";

//Assets
import Background from "../assets/images/wide_logo.jpg";

const Registration = () => {
  const navigate = useNavigate();
  const [swapPanel, setSwapPanel] = useState(false);

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    navigate("/dashboard");
  };

  const signUpButton = () => {
    setSwapPanel(true);
  };
  const signInButton = () => {
    setSwapPanel(false);
  };

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <form onSubmit={handleLogin}>
              <h2>Sign Up</h2>
              <div className="form-input">
                <label for="name">Name</label>
                <input type="text" id="name" placeholder="John" required />
              </div>
              <div className="form-input">
                <label for="e-mail">E-Mail</label>
                <input
                  type="email"
                  id="e-mail"
                  placeholder="example@mail.com"
                  required
                />
              </div>
              <div className="form-input">
                <label for="password">Password</label>
                <input type="password" id="password" required />
              </div>

              <div className="form-input">
                <label for="confirm-password">Confirm Password</label>
                <input type="password" id="confirm-password" required />
              </div>
              <button type="submit">SIGN UP</button>
            </form>
          </div>

          <div
            className={`sign-in-container ${
              swapPanel ? `right-panel-active` : ``
            }`}
          >
            <form onSubmit={handleLogin}>
              <h2>Sign In</h2>
              <div className="form-input">
                <label for="e-mail">E-Mail</label>
                <input
                  type="email"
                  id="e-mail"
                  placeholder="example@mail.com"
                  required
                />
              </div>
              <div className="form-input">
                <label for="password">Password</label>
                <input type="password" id="password" required />
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
