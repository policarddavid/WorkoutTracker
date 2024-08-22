import "./App.css";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Workout } from "./components/Workout";
import WeekView from "./components/WeekView";
import Calendar from "./components/MyCalendar";
import { Exercise } from "./components/Workout";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
const workouts: Workout[] = [
  {
    name: "Arnold Split",
    id: "workout1",
    days: [
      {
        name: "Monday",
        exercises: [
          new Exercise("Push-ups", 3, 10, 0),
          new Exercise("Box Jumps", 3, 10, 0),
        ],
      },
      {
        name: "Tuesday",
        exercises: [new Exercise("Squats", 3, 10, 0)],
      },
      {
        name: "Wednesday",
        exercises: [new Exercise("Pull-ups", 3, 8, 0)],
      },
      {
        name: "Thursday",
        exercises: [new Exercise("Deadlifts", 3, 5, 100)],
      },
      {
        name: "Friday",
        exercises: [new Exercise("Bench Press", 3, 10, 50)],
      },
      {
        name: "Saturday",
        exercises: [new Exercise("Lunges", 3, 12, 0)],
      },
      {
        name: "Sunday",
        exercises: [new Exercise("Rest", 0, 0, 0)],
      },
    ],
  },
  {
    name: "Ana de armas split",
    id: "workout2",
    days: [
      {
        name: "Monday",
        exercises: [
          new Exercise("squats", 3, 10, 0),
          new Exercise("hip thrusts", 3, 10, 0),
          new Exercise("more squats idk", 3, 10, 0),
        ],
      },
      {
        name: "Tuesday",
        exercises: [
          new Exercise("hip abductors", 3, 15, 0),
          new Exercise("hip thrust", 3, 125, 0),
        ],
      },
      {
        name: "Wednesday",
        exercises: [new Exercise("Pull-ups", 3, 8, 0)],
      },
      {
        name: "Thursday",
        exercises: [new Exercise("Deadlifts", 3, 5, 100)],
      },
      {
        name: "Friday",
        exercises: [new Exercise("Bench Press", 3, 10, 50)],
      },
      {
        name: "Saturday",
        exercises: [new Exercise("Lunges", 3, 12, 0)],
      },
      {
        name: "Sunday",
        exercises: [new Exercise("Rest", 0, 0, 0)],
      },
    ],
  },
];

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} /> */}
        <Route path="/" element={<Home workoutList={workouts} />} />
        <Route path={`/MyCalendar`} element={<Calendar />} />
        <Route path={`/WeekView`} element={<WeekView />} />
      </Routes>
    </Router>
  );
}

export default App;
