import ListGroup from "./ListGroup";
import { Workout } from "./Workout";
import "./Home.css";
import { useState, useEffect } from "react";
import { set } from "date-fns";

interface HomeProps {
  workoutList: Workout[];
}
function Home({ workoutList }: HomeProps) {
  const [data, setData] = useState<Workout>();
  const handleSelectItem = (key: string) => {
    setData(workoutList.find((workout) => workout.id === key));
  };
  useEffect(() => {
    if (data) {
      localStorage.setItem(`myWorkout`, JSON.stringify(data));
      window.location.href = `/${data.id}`;
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
        onSelectItem={handleSelectItem}
      />
    </div>
  );
}

export default Home;
