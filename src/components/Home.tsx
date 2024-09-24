import ListGroup from "./ListGroup";
import Nav from "./Nav";
import { Workout } from "./Workout";
import "./Home.css";
import Button from "./Button";
import { useState, useEffect } from "react";
import { Exercise } from "./Workout";
import MyCalendar from "./MyCalendar";
import "./MyCalendar.css";
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
      <Nav />
      <div className="hometitle">
        <h1 className="title">ICONICFITNESS</h1>
        <h2 className="subtitle">-Workout Like an Icon-</h2>
      </div>
      <div className="content">
        <div className="chooseworkout">
          <div className="textButton">
            <h2 className="subtitle">Choose a popular workout plan</h2>
            <Button
              color="large"
              onClick={() => (window.location.href = "/IconsView")}
            >
              Browse Workouts
            </Button>
          </div>
          <div className="textButton">
            <h2 className="subtitle">Or create your own!</h2>
            <Button
              color="large"
              onClick={() => (window.location.href = "/IconsView")}
            >
              Custom Workout
            </Button>
          </div>
        </div>
        <div className="trackcalendar">
          <h2 className="heading">Track your progress</h2>
          <div className="calendarPreview">
            <MyCalendar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
