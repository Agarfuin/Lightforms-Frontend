//Components
import Header from "../components/Header/Header";

//Styles
import "../assets/styles/dashboard.scss";

const Dashboard = () => {
  return (
    <>
      <Header /* isLoggedIn={true} */ isLoggedIn />
      <main id="dashboard">
        <div className="container">
          <div className="dashboard-container">

          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
