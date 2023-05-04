import React, { useState } from "react";

//Styles
import "../assets/styles/registration.scss";
import { Link } from "react-router-dom";

const Registration = () => {
  const [swapPanel, setSwapPanel] = useState(false);

  const signUpButton = () => {
    setSwapPanel(true);
  };
  const signInButton = () => {
    setSwapPanel(false);
  };

  return (
    <>
      <main id="registration">
        <div className="container">
          <div className="registration-container">
            <div className={`sign-up-container ${swapPanel ? `right-panel-active` : ``}`}>
              <form action="#" method="post">
                <h2>Sign Up</h2>
                <label for="name">
                  Name
                  <input type="text" id="name" placeholder="John" required />
                </label>

                <label for="e-mail">
                  E-Mail
                  <input
                    type="email"
                    id="e-mail"
                    placeholder="example@mail.com"
                    required
                  />
                </label>

                <label for="password">
                  Password
                  <input type="password" id="password" required />
                </label>

                <label for="confirm-password">
                  Confirm Password
                  <input type="password" id="confirm-password" required />
                </label>

                <Link to="/dashboard">
                  <button onClick={signUpButton}>SIGN UP</button>
                </Link>
              </form>
            </div>

            <div className={`sign-in-container ${swapPanel ? `right-panel-active` : ``}`}>
              <form action="/dashboard">
                <h2>Sign In</h2>
                <label for="e-mail">
                  E-Mail
                  <input
                    type="email"
                    id="e-mail"
                    placeholder="example@mail.com"
                    required
                  />
                </label>

                <label for="password">
                  Password
                  <input type="password" id="password" required />
                </label>

                <Link to="/dashboard">
                  <button onClick={signInButton}>SIGN IN</button>
                </Link>
              </form>
            </div>

            <div className={`overlay-container ${swapPanel ? `right-panel-active` : ``}`}>
              <div className={`overlay ${swapPanel ? `right-panel-active` : ``}`}>
                <div className={`overlay-panel overlay-left ${swapPanel ? `right-panel-active` : ``}`}>
                  <h1>Already have an account?</h1>
                  <button className="ghost" id="signIn" onClick={signInButton}>
                    SIGN IN
                  </button>
                </div>

                <div className={`overlay-panel overlay-right ${swapPanel ? `right-panel-active` : ``}`}>
                  <h1>Don't have an account?</h1>
                  <button className="ghost" id="signUp" onClick={signUpButton}>
                    SIGN UP
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Registration;