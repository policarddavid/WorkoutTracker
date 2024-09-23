import React from "react";
import Table from "./Table";
import { Workout } from "./Workout";
import Button from "./Button";

const WeekView: React.FC = () => {
  let workout: Workout = JSON.parse(localStorage.getItem("myWorkout")!);
  return (
    <div style={{ textAlign: "center" }}>
      <Table />
      <Button
        onClick={() => (window.location.href = `/CalendarView`)}
        color="dark"
      >
        View My Calendar
      </Button>
    </div>
  );
};

export default WeekView;
