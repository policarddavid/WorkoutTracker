import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";
import axios from "axios";
import "./Nav.css";

const NavBar: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("loggedIn"));

  useEffect(() => {
    setLoggedIn(localStorage.getItem("loggedIn"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    setLoggedIn(null);
  };

  return (
    <Nav className="nav" style={{ width: "100%", position: "fixed", top: 0 }}>
      <ul className="nav-links">
        <li className="logo">
          <a href="/">IconicFitness</a>
        </li>
        <li>
          <a href="/IconsView">Workouts</a>
        </li>
        <li>
          <a href="/WeekView">Week View</a>
        </li>
        <li>
          <a href="/CalendarView">Calendar</a>
        </li>
        <li className="spacer"></li>
        <li hidden={loggedIn != null}>
          <a href="/SignupView">Register</a>
        </li>
        <li hidden={loggedIn != null}>
          <a href="/LoginView">Login</a>
        </li>
        <li hidden={loggedIn === null}>
          <a href="/" onClick={handleLogout}>
            Logout
          </a>
        </li>
      </ul>
    </Nav>
  );
};

export default NavBar;
