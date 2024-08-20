import React from "react";
import ListGroup from "./ListGroup";

const ArnoldSplit: React.FC = () => {
  const exercises = ["Bench Press", "Squat", "Deadlift", "Shoulder Press"];
  const keys = ["BenchPress", "Squat", "Deadlift", "ShoulderPress"];

  return (
    <div>
      <ListGroup
        items={exercises}
        keys={keys}
        heading="Arnold Split"
        onSelectItem={(item) => console.log(item)} // onSelectItem is a function that takes a string as an argument and returns void
      />
    </div>
  );
};

export default ArnoldSplit;
