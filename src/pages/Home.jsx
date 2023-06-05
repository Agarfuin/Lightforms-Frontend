import { useState } from "react";

//Components
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

// Styles
import "../assets/styles/home.scss";

//Images
import Keyboard from "../assets/images/keyboardIcon.png";
import Feather from "../assets/images/featherIcon.png";
import bg from "../assets/images/logo_transparent.png";

//Components
import FormInput from "../components/Utils/FormInput";

const Home = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleFeedback = async (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      message,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Form submitted successfully!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        alert("Form submission failed!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <Header />
      <main id="home">
        <div className="background-img">
          <img
            src={bg}
            alt="bg"
          />
        </div>
        <div className="home-container container">
          <section className="introduction">
            <h1 className="introduction-slogan">
              Light Forms <br/>
              <i>Simplify Surveys, Illuminate Insights</i>
            </h1>
            <p className="introduction-text">
              Light Forms was desgined to create a simple and effective
              alternative to Google Forms that is easy for anyone to use. We
              believe that by focusing on the core features and keeping the user
              experience front and center, we can create a valuable tool that
              will be useful to many people.
            </p>
          </section>

          <section className="features-container">
            <div className="features">
              <div className="features-img">
                <img
                  src={Keyboard}
                  alt=""
                />
              </div>
              <h4 className="features-title">Easy to Use</h4>
              <p className="features-description">
                <i>Survey Simplicity, Light Forms' Specialty</i>
              </p>
            </div>

            <div className="features">
              <div className="features-img">
                <img
                  src={Feather}
                  alt=""
                />
              </div>
              <h4 className="features-title">Light to Carry</h4>
              <p className="features-description">
                <i>Light as a Feather, Surveys Go Wherever</i>
              </p>
            </div>
          </section>

          <section className="contact-us">
            <div className="our-message">
              <h1>We'd Love to Hear From You!</h1>
            </div>

            <div className="feedback">
              <div className="personalInfo">
                <FormInput
                  label={"Name"}
                  name={"feedback-name"}
                  inputType={"text"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <FormInput
                  label={"E-mail"}
                  name={"feedback-email"}
                  inputType={"email"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <textarea
                className="feedback message"
                placeholder="Type message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <div className="feedback-button">
                <button
                  type="submit"
                  onClick={handleFeedback}
                >
                  Submit
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
