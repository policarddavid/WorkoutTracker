import Button from "./components/Button";
import ListGroup from "./components/ListGroup";
import Message from "./components/Message";
import "./App.css";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ArnoldSplit from "./components/ArnoldSplit";
import Workout from "./components/Workout";

const workouts = [
  {
    id: "ArnoldSplit",
    name: "Arnold Split",
    exercises: ["Bench Press", "Squat", "Deadlift", "Shoulder Press"],
  },
  {
    id: "PPL",
    name: "Push, Pull, Legs",
    exercises: ["Bench Press", "Pull Ups", "Squats", "Deadlifts"],
  },
];

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {workouts.map((workout) => (
          <Route
            path={`/${workout.id}`}
            element={
              <Workout
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
