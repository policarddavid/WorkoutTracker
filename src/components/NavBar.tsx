import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import axios from "axios";
import "./Nav.css";

const NavBar: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("loggedIn"));
  const [username, setUsername] = useState("");
  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    setLoggedIn(null);
  };

  useEffect(() => {
    setLoggedIn(localStorage.getItem("loggedIn"));
    const getUserData = () => {
      if (loggedIn) {
        axios
          .get("http://127.0.0.1:8000/user/", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          })
          .then((response) => {
            setUsername(response.data.username);
          })
          .catch((error) => {
            handleLogout();
            console.log(error.response.data);
          });
      }
    };
    getUserData();
  }, []);

  return (
    <Nav className="nav" style={{ width: "100%", position: "fixed", top: 0 }}>
      <ul className="nav-links">
        <li className="logo">
          <a href="/">IconicFitness</a>
        </li>
        <li>
          <a href="/IconsView">Icon Workouts</a>
        </li>
        <li>
          <a href="/WeekView">Edit Workout</a>
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
        <li hidden={!loggedIn} color="orange">
          Welcome {username}
        </li>
        <li hidden={!loggedIn}>
          <a href="/" onClick={handleLogout}>
            Logout
          </a>
        </li>
      </ul>
    </Nav>
  );
};

export default NavBar;
