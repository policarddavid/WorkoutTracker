import ListGroup from "./ListGroup";
import { Workout } from "./Workout";
import "./Home.css";
import { useState, useEffect } from "react";
import { Exercise } from "./Workout";
const customWorkout: Workout = {
  name: "Your custom workout",
  id: "customWorkout",
  days: [
    {
      name: "Monday",
      exercises: [
        new Exercise("Exercise 1", 3, 10, 0),
        new Exercise("Exercise 2", 3, 10, 0),
        new Exercise("Exercise 3", 3, 10, 0),
      ],
    },
    {
      name: "Tuesday",
      exercises: [
        new Exercise("Exercise 1", 3, 10, 0),
        new Exercise("Exercise 2", 3, 10, 0),
        new Exercise("Exercise 3", 3, 10, 0),
      ],
    },
    {
      name: "Wednesday",
      exercises: [
        new Exercise("Exercise 1", 3, 10, 0),
        new Exercise("Exercise 2", 3, 10, 0),
        new Exercise("Exercise 3", 3, 10, 0),
      ],
    },
    {
      name: "Thursday",
      exercises: [
        new Exercise("Exercise 1", 3, 10, 0),
        new Exercise("Exercise 2", 3, 10, 0),
        new Exercise("Exercise 3", 3, 10, 0),
      ],
    },
    {
      name: "Friday",
      exercises: [
        new Exercise("Exercise 1", 3, 10, 0),
        new Exercise("Exercise 2", 3, 10, 0),
        new Exercise("Exercise 3", 3, 10, 0),
      ],
    },
    {
      name: "Saturday",
      exercises: [
        new Exercise("Exercise 1", 3, 10, 0),
        new Exercise("Exercise 2", 3, 10, 0),
        new Exercise("Exercise 3", 3, 10, 0),
      ],
    },
    {
      name: "Sunday",
      exercises: [
        new Exercise("Exercise 1", 3, 10, 0),
        new Exercise("Exercise 2", 3, 10, 0),
        new Exercise("Exercise 3", 3, 10, 0),
      ],
    },
  ],
};

interface HomeProps {
  workoutList: Workout[];
}
function Home({ workoutList }: HomeProps) {
  const [data, setData] = useState<Workout>();
  const handleCustomWorkout = () => {
    setData(customWorkout);
  };
  const handleSelectItem = (key: string) => {
    setData(workoutList.find((workout) => workout.id === key));
  };
  useEffect(() => {
    if (data) {
      localStorage.setItem(`myWorkout`, JSON.stringify(data));
      window.location.href = `/WeekView`;
    }
  }, [data]);
  let workoutNames: string[];
  let workoutIds: string[];
  workoutNames = workoutList.map((workout) => workout.name);
  workoutIds = workoutList.map((workout) => workout.id);
  return (
    <div className="home">
      <ListGroup
        items={workoutNames}
        keys={workoutIds}
        heading="Try one of our popular workout plans"
        onSelectItem={handleSelectItem}
      />
      <h2>Or create your own!</h2>
      <ListGroup
        items={["Custom workout plan"]}
        keys={["CustomWorkoutPlan"]}
        onSelectItem={handleCustomWorkout}
      />
    </div>
  );
}

export default Home;
