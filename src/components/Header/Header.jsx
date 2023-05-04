import { Link } from "react-router-dom";
import { useState } from "react";

//Assets
import Logo from "../../assets/images/logo_w_text.png";
import "../../assets/styles/header.scss";

export default function Header({ isDashboard }) {

  const [open, setOpen] = useState(false);

  const openDropdown = () => {
    setOpen(!open)
  };

  return (
    <div id="header" className={isDashboard && "dashboard"}>
      <div className="container">
        <div className="left">
          <Link to="/">
            <img src={Logo} alt="logo" className="logo" />
          </Link>
          <span>Lightweight Forms</span>
        </div>
        <div className="right">
          {!isDashboard ? (
            <Link to="/registration">
              <button className="startButton">Start Creating!</button>
            </Link>
          ) : (
            <div className="profileMenu">
              <button className="profileButton" onClick={openDropdown}>
                A
              </button>
              {open ? (
                <div className="dropdown-container" id="dropdownMenu">
                  <div className="dropdown">
                    <span>Hello Alex!</span>
                    <Link to="/">
                      <button className="signoutButton">Sign Out</button>
                    </Link>
                  </div>
                </div>
              ): null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
