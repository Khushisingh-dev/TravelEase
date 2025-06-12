import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./HeaderFooter.css";

const HeaderFooter = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className={`header ${isHome ? "home-header" : "default-header"}`}>
      <div className="left">
        <li>TravelEase</li>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <div className={menuOpen ? "bar rotate1" : "bar"}></div>
        <div className={menuOpen ? "bar fade" : "bar"}></div>
        <div className={menuOpen ? "bar rotate2" : "bar"}></div>
      </div>

      <NavLink className="signupbtn" to="/sign-up">
        <button className="signup-btn-header">Sign Up</button>
      </NavLink>

      <ul className={`right ${menuOpen ? "open" : ""}`}>
        <NavLink className="navbtn" to="/" onClick={() => setMenuOpen(false)}><li>Home</li></NavLink>
        <NavLink className="navbtn" to="/about" onClick={() => setMenuOpen(false)}><li>About</li></NavLink>
        <NavLink className="navbtn" to="/connect" onClick={() => setMenuOpen(false)}><li>Connect</li></NavLink>
      </ul>

    </header>
  );
};

export default HeaderFooter;
