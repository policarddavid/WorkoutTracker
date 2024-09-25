import Card from "./Card";
import NavBar from "./NavBar";
import "./Nav.css";
import "./IconsView.css";
import workoutsdata from "../assets/workouts.json";

const IconsView: React.FC = () => {
  return (
    <div className="icons">
      <h1 className="title">Iconic Workouts</h1>
      <h2 className="subtitle">Train like your favorite icon</h2>
      <div className="card-container">
        {workoutsdata.workouts.map((workout, index) => (
          <Card
            key={index}
            img={workout.img}
            title={workout.name}
            id={workout.id}
          />
        ))}
      </div>
      <NavBar />
    </div>
  );
};

export default IconsView;
