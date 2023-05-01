import React, { useState } from "react";

//Styles
import "../assets/styles/registration.scss";

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
        <div
          className={["container", swapPanel ? "right-panel-active" : null]
            .filter(Boolean)
            .join(" ")}
          id="container"
        >
          <div className="registration-container">
            <div className="registration-container sign-up-container">
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

                <a href="/dashboard" target="_blank">
                  <button onClick={signUpButton}>SIGN UP</button>
                </a>
              </form>
            </div>

            <div className="registration-container sign-in-container">
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

                <a href="/dashboard" target="_blank">
                  <button onClick={signInButton}>SIGN IN</button>
                </a>

                {/* Remember me ve forgot password olacak mÄ±????? */}
              </form>
            </div>

            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel  overlay-left">
                  <h1>Already have an account?</h1>
                  <button className="ghost" id="signIn" onClick={signInButton}>
                    SIGN IN
                  </button>
                </div>

                <div className="overlay-panel overlay-right">
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
