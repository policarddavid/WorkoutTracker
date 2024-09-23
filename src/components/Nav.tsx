import React from "react";
import "./Nav.css";

const Nav: React.FC = () => {
  return (
    <nav className="nav" style={{ width: "100%", position: "fixed", top: 0 }}>
      <li className="logo">
        <a href="/">IconicFitness</a>
      </li>
      <ul className="nav-links">
        <li>
          <a href="/CalendarView">Calendar</a>
        </li>
        <li>
          <a href="/WeekView">Workout</a>
        </li>
      </ul>
      <ul className="login">
        <li>
          <a href="#">login</a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
