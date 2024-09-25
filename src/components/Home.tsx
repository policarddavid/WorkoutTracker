import NavBar from "./NavBar";
import "./Home.css";
import Button from "./Button";
import MyCalendar from "./MyCalendar";
import customworkoutdata from "../assets/customworkout.json";

const Home: React.FC = () => {
  const handleCustomWorkout = () => {
    localStorage.setItem("myWorkout", JSON.stringify(customworkoutdata));
    window.location.href = "/WeekView";
  };
  return (
    <div className="home">
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
              onClick={() => {
                handleCustomWorkout();
              }}
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
      <NavBar />
    </div>
  );
};

export default Home;
