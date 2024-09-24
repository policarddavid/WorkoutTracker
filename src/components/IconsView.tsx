import Card from "./Card";
import Nav from "./Nav";
import "./Nav.css";
import "./IconsView.css";
import { Workout } from "./Workout";
import arnold from "../assets/arnold.jpg";
const arnoldImg = <img src={arnold} alt="Arnold" />;

interface IconsViewProps {
  workoutList: Workout[];
}

function IconsView({ workoutList }: IconsViewProps) {
  return (
    <div className="icons">
      <h1 className="title">Iconic Workouts</h1>
      <h2 className="subtitle">Train like your favorite icon</h2>
      <div className="card-container">
        {workoutList.map((workout, index) => (
          <Card key={index} img={workout.img} title={workout.name} />
        ))}
      </div>
      <Nav />
    </div>
  );
}

export default IconsView;
