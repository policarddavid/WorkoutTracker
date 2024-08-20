import "./App.css";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Workout } from "./components/Workout";
import WorkoutGen from "./components/WorkoutGen";

function App() {
  const workouts: Workout[] = [
    {
      name: "Arnold Split",
      id: "workout1",
      days: [
        {
          name: "Monday",
          exercises: [
            { name: "Push-ups", sets: 3, reps: 10, weight: 0 },
            { name: "box jumps", sets: 3, reps: 10, weight: 0 },
          ],
        },
        {
          name: "Tuesday",
          exercises: [{ name: "Squats", sets: 3, reps: 15, weight: 0 }],
        },
        {
          name: "Wednesday",
          exercises: [{ name: "Pull-ups", sets: 3, reps: 8, weight: 0 }],
        },
        {
          name: "Thursday",
          exercises: [{ name: "Deadlifts", sets: 3, reps: 5, weight: 100 }],
        },
        {
          name: "Friday",
          exercises: [{ name: "Bench Press", sets: 3, reps: 10, weight: 50 }],
        },
        {
          name: "Saturday",
          exercises: [{ name: "Lunges", sets: 3, reps: 12, weight: 0 }],
        },
        {
          name: "Sunday",
          exercises: [{ name: "Rest", sets: 0, reps: 0, weight: 0 }],
        },
      ],
    },
  ];
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home workoutList={workouts} />} />
        {workouts.map((workout) => (
          <Route
            path={`/${workout.id}`}
            element={<WorkoutGen workout={workout} />}
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
