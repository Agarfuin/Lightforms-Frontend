import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//Styles
import "../assets/styles/registration.scss";

//Assets
import Background from "../assets/images/wide_logo.jpg";

//Components
import FormInput from "../components/Utils/FormInput";

const Registration = () => {
  const navigate = useNavigate();
  const [swapPanel, setSwapPanel] = useState(false);
  const localStorageTokenKey = "token";
  const baseURL =
    "https://api.lightforms.co/api/auth/";

  const [registrationData, setRegistrationData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tempData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.token) {
            localStorage.setItem(localStorageTokenKey, data.token);
            navigate("/dashboard");
          } else {
            alert(
              data.error ||
                "An error occurred during sign up. Please try again."
            );
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred. Please try again later.");
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tempData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem(localStorageTokenKey, data.token);
          navigate("/dashboard");
        } else {
          alert(
            data.error || "An error occurred during sign in. Please try again."
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      });
  };

  const signUpButton = () => {
    setSwapPanel(true);
  };
  const signInButton = () => {
    setSwapPanel(false);
  };

  useEffect(() => {
    if (localStorage.getItem(localStorageTokenKey)) {
      navigate("/dashboard");
    } else {
      navigate("/registration");
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
          <form className="registrationForm" onSubmit={handleSignUp}>
            <h2>Sign Up</h2>
            <FormInput
              label="Name"
              inputType="text"
              name="name"
              placeholder="John"
              onChange={handleInputChange}
              required
            />

            <FormInput
              label="E-Mail"
              inputType="email"
              name="email"
              placeholder="example@mail.com"
              onChange={handleInputChange}
              required
            />

            <FormInput
              label="Password"
              inputType="password"
              name="password"
              onChange={handleInputChange}
              required
            />

            <FormInput
              label="Confirm Password"
              inputType="password"
              name="confirmPassword"
              onChange={handleInputChange}
              required
            />
            <button type="submit">SIGN UP</button>
          </form>
        </div>

        <div
          className={`sign-in-container ${
            swapPanel ? `right-panel-active` : ``
          }`}
        >
          <form className="registrationForm" onSubmit={handleSignIn}>
            <h2>Sign In</h2>
            <FormInput
              label="E-Mail"
              inputType="email"
              name="email"
              id="signIn-email"
              placeholder="example@mail.com"
              onChange={handleInputChange}
              required
            />

            <FormInput
              label="Password"
              inputType="password"
              name="password"
              id="signIn-password"
              onChange={handleInputChange}
              required
            />
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
