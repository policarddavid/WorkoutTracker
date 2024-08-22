import React from "react";
import Table from "./Table";
import { Workout } from "./Workout";
import Button from "./Button";

interface Props {
  workout: Workout;
}

const WeekView: React.FC<Props> = ({ workout }: Props) => {
  localStorage.setItem(`myWorkout`, JSON.stringify(workout));
  return (
    <div style={{ textAlign: "center" }}>
      <Table workout={workout} />
      <Button
        onClick={() => (window.location.href = `/MyCalendar`)}
        color="dark"
      >
        View My Calendar
      </Button>
    </div>
  );
};

export default WeekView;
