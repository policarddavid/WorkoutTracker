import React from "react";
import Table from "./Table";
import { Workout } from "./Workout";
import Button from "./Button";
import "./WeekView.css";
import Nav from "./Nav";
import "./Nav.css";

const WeekView = () => {
  return (
    <div className="weekpage">
      <div className="tableContainer">
        <Table />
      </div>
      <Button
        onClick={() => (window.location.href = `/CalendarView`)}
        color="large"
      >
        View Calendar
      </Button>
      <Nav />
    </div>
  );
};

export default WeekView;
