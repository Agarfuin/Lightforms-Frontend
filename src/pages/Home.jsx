//Components
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

import bg from "../assets/images/logo_transparent.png";

// Styles
import "../assets/styles/home.scss";

//Images
import Keyboard from "../assets/images/keyboard.png";
import Feather from "../assets/images/feather.png";

const Home = () => {
  return (
    <>
      <Header />
      <main id="home">
        <div className="background-img">
          <img src={bg} alt="" />
        </div>
        <div className="home-container container">
          <section className="introduction">
            <h1 className="introduction-slogan">
              Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing Elit
            </h1>
            <p className="introduction-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              rutrum nec leo in rutrum. In aliquet diam quis nulla tincidunt,
              non tempus tortor efficitur. In hac habitasse platea dictumst.{" "}
            </p>
          </section>

          <section className="features">
            <div className="features-one">
              <div className="features-one-img">
                <img src={Keyboard} alt="" />
              </div>
              <h4 className="features-title">Easy to use</h4>
              <p className="features-description">
                hebele hübelehdfggkjg fsjkgshg hfgh
              </p>
            </div>

            <div className="features-two">
              <div className="features-two-img">
                <img src={Feather} alt="" />
              </div>
              <h4 className="features-title">Light to carry</h4>
              <p className="features-description">
                mrb cnm burda bir aciklama yatiyor
              </p>
            </div>
          </section>

          <section className="contact-us">
            <div className="our-message">
              <h1>We'd Love to Hear From You!</h1>
            </div>

            <div className="feedback">
              <label for="feedback-name">
                Name
                <input type="text" name="feedback-name" id="feedback-name" />
              </label>

              <label for="feedback-email">
                Email
                <input type="email" name="feedback-email" id="feedback-email" />
              </label>

              <textarea
                id="feedback-message"
                rows="8"
                cols="40"
                placeholder="Type message here..."
              ></textarea>
              <button type="submit" id="feedback-submit">
                Submit
              </button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
