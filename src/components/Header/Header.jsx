import React from "react";
import Logo from "../../assets/images/logo_w_text.png";

export default function Header({ isLoggedIn }) {
  return (
    <header id="header" className={isLoggedIn && "logged"}>
      <div className="container">
        <div id="header-container">
          <div id="header-left">
            <div id="header-logo">
              <a href="/" target="_blank">
                <img src={Logo} alt="logo" />
              </a>
            </div>
            <h1 id="logo-title">Lightweight Forms</h1>
          </div>
          <div id="header-right">
            {!isLoggedIn ? (
              <a href="/registration" target="_blank">
                <button id="start-button">Start Creating!</button>
              </a>
            ) : (
              /* Dashboard'ın dropdown elementi buraya yazılacak */
              <span>Dropdown</span>
            )}

            
          </div>
        </div>
      </div>
    </header>
  );
}
