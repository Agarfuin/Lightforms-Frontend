//Components
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

// Styles
import "../assets/styles/home.scss";

//Images
import Keyboard from "../assets/images/keyboardIcon.png";
import Feather from "../assets/images/featherIcon.png";
import bg from "../assets/images/logo_transparent.png";

const Home = () => {
  return (
    <>
      <Header />
      <main id="home">
        <div className="background-img">
          <img src={bg} alt="bg" />
        </div>
        <div className="home-container container">
          <section className="introduction">
            <h1 className="introduction-slogan">
              Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing Elit
            </h1>
            <p className="introduction-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              rutrum nec leo in rutrum. In aliquet diam quis nulla tincidunt,
              non tempus tortor efficitur. In hac habitasse platea dictumst. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam assumenda doloremque impedit tempore?
            </p>
          </section>

          <section className="features-container">
            <div className="features">
              <div className="features-img">
                <img src={Keyboard} alt="" />
              </div>
              <h4 className="features-title">Easy to use</h4>
              <p className="features-description">
                Lorem ipsum dolor sit amet consectetur
              </p>
            </div>

            <div className="features">
              <div className="features-img">
                <img src={Feather} alt="" />
              </div>
              <h4 className="features-title">Light to carry</h4>
              <p className="features-description">
                Lorem ipsum dolor sit amet consectetur
              </p>
            </div>
          </section>

          <section className="contact-us">
            <div className="our-message">
              <h1>We'd Love to Hear From You!</h1>
            </div>

            <div className="feedback">
              <div className="feedback personalInfo">
                <label htmlFor="feedback-name">
                  Name
                  <input type="text" name="feedback-name" id="feedback-name" />
                </label>

                <label htmlFor="feedback-email">
                  Email
                  <input
                    type="email"
                    name="feedback-email"
                    id="feedback-email"
                  />
                </label>
              </div>
              <textarea
                className="feedback message"
                placeholder="Type message here..."
              ></textarea>
              <button type="submit">
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
