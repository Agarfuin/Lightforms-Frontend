import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

//Assets
import Logo from "../../assets/images/logo_w_text.png";
import "../../assets/styles/header.scss";

export default function Header({ isDashboard, isNewForm }) {

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({})

  const handleStartCreating = () => {
    if (localStorage.getItem("isLoggedIn")) {
      navigate("/dashboard");
    } else {
      navigate("/registration");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const openDropdown = () => {
    setOpen(!open);
  };

  window.onclick = (event) => {
    if (!event.target.closest(".profileMenu")) {
      setOpen(false);
    }
  };
 

  const getUserData = () => {
    // fetch('https://jsonplaceholder.typicode.com/todos/1')
    //   .then(response => response.json())
    //   .then(json => {  return setUserData(json)})

 
    const fakeUserData = {
      name:"Şimal",
    }

    setUserData(fakeUserData)
  }
 
  useEffect (
    () => {
      if (localStorage.getItem("isLoggedIn")) {
        getUserData()
      }
    }, []
  ) 

  return (
    <div id="header" className={isDashboard || isNewForm ? "dashboard" : ""}>
      <div className="container">
        <div className="left">
          <Link to="/">
            <div className="logo">
              <img src={Logo} alt="logo" />
            </div>
          </Link>
          <span className="logoTitle">Lightweight Forms</span>
        </div>
        <div className="right">
          {!isDashboard && !isNewForm ? (
            <button className="startButton" onClick={handleStartCreating}>
              Start Creating!
            </button>
          ) : (
            <div className="profileMenu">
              <button className="profileButton" onClick={openDropdown}>
              {userData?.name?.toString()[0]}
              </button>
              {open ? (
                <div className="dropdown-container" id="dropdownMenu">
                  <div className="dropdown">
                    <span>Hello {userData?.name}!</span>
                    <button className="signoutButton" onClick={handleLogout}>
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
