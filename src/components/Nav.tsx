import React from "react";
import "./Nav.css";

const Nav: React.FC = () => {
  return (
    <nav className="nav" style={{ width: "100%", position: "fixed", top: 0 }}>
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
        <li>
          <a href="/SignupView">Register</a>
        </li>
        <li>
          <a href="/LoginView">login</a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
