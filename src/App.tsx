import "./App.css";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import WeekView from "./components/WeekView";
import CalendarView from "./components/CalendarView";
import IconsView from "./components/IconsView";
import LoginView from "./components/LoginView";
import SignupView from "./components/SignupView";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/IconsView" element={<IconsView />} />
        <Route path="/CalendarView" element={<CalendarView />} />
        <Route path="/LoginView" element={<LoginView />} />
        <Route path="/SignupView" element={<SignupView />} />
        <Route path={`/WeekView`} element={<WeekView />} />
      </Routes>
    </Router>
  );
}

export default App;
