import Button from "./components/Button";
import ListGroup from "./components/ListGroup";
import Message from "./components/Message";
import "./App.css";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Workout } from "./components/Workout";
import WorkoutGen from "./components/WorkoutGen";

function App() {
  const workouts: Workout[] = [
    {
      name: "Arnold Split",
      id: "ArnoldSplit",
      exercises: ["Bench Press", "Squat", "Deadlift", "Shoulder Press"],
    },
    {
      name: "Push, Pull, Legs",
      id: "PPL",
      exercises: ["Bench Press", "Pull Ups", "Squats", "Deadlifts"],
    },
    {
      name: "BBL DRIZZY SPLIT",
      id: "BBL",
      exercises: ["twerking", "shaking ass", "hip thrusting"],
    },
  ];
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home workoutList={workouts} />} />
        {workouts.map((workout) => (
          <Route
            path={`/${workout.id}`}
            element={
              <WorkoutGen
                name={workout.name}
                id={workout.id}
                exercises={workout.exercises}
              />
            }
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
