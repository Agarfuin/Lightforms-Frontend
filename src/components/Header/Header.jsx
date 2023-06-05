import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Redux Toolkit
import { useSelector, useDispatch } from "react-redux";
import {  } from "../../store/features/userSlice";

//Assets
import Logo from "../../assets/images/logo.png";
import "../../assets/styles/header.scss";

//Components
import capitalize from "../Utils/Capitalize";

export default function Header({ isDashboard, isNewForm }) {
  const navigate = useNavigate();
  const dispatch = useDispatch()


  const localStorageTokenKey = "token";
  const baseURL = "https://api.lightforms.co/api/services";

  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState("");

  // Get id value 
  const userToken = useSelector((state) => state.user.token)

  const handleStartCreating = () => {
    if (localStorage.getItem(localStorageTokenKey)) {
      navigate("/dashboard");
    } else {
      navigate("/registration");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(localStorageTokenKey);
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
    if (localStorage.getItem(localStorageTokenKey)) {
      const token = localStorage.getItem(localStorageTokenKey);
      const api = `${baseURL}/users/profile`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      fetch(api, {
        method: "GET",
        headers: headers,
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
          throw new Error("Something went wrong");
        })
        .then((data) => {
          setUserData(data.name);
        });
    }
  };

  useEffect(() => {
    if (localStorage.getItem(localStorageTokenKey)) {
      getUserData();
    }
  }, []);

  return (
    <div
      id="header"
      className={isDashboard || isNewForm ? "dashboard" : ""}
    >
      <div className="container">
        <div className="left">
          <Link to="/">
            <div className="logo">
              <img
                src={Logo}
                alt="logo"
              />
            </div>
          </Link>
          <span className="logoTitle">Light Forms</span>
        </div>
        <div className="right">
          {!isDashboard && !isNewForm ? (
            <button
              className="startButton"
              onClick={handleStartCreating}
            >
              Start Creating!
            </button>
          ) : (
            <div className="profileMenu">
              <button
                className="profileButton"
                onClick={openDropdown}
              >
                {capitalize(userData?.toString()[0])}
              </button>
              {open ? (
                <div
                  className="dropdown-container"
                  id="dropdownMenu"
                >
                  <div className="dropdown">
                    <span>Hello {capitalize(userData)}!</span>
                    <button
                      className="signoutButton"
                      onClick={handleLogout}
                    >
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
