import React from "react";
import Table from "./Table";
import { Workout } from "./Workout";
import Button from "./Button";
import "./WeekView.css";
import Nav from "./Nav";
import "./Nav.css";

const WeekView: React.FC = () => {
  let workout: Workout = JSON.parse(localStorage.getItem("myWorkout")!);
  return (
    <div className="weekpage">
      <Nav />
      <Table />
      <Button
        onClick={() => (window.location.href = `/CalendarView`)}
        color="large"
      >
        View My Calendar
      </Button>
    </div>
  );
};

export default WeekView;
