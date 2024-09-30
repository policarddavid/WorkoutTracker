import Button from "./Button";
import workoutsdata from "../assets/workouts.json";
import { Workout } from "./Workout";

interface Props {
  img: string;
  title: string;
  id: string;
  text?: string;
}
const handleClick = (id: string) => {
  const workoutData = workoutsdata.workouts.find(
    (workout) => workout.id === id
  );
  if (!workoutData) {
    throw new Error(`Workout with id ${id} not found`);
  }
  const initialWorkout: Workout = {
    ...workoutData,
    days: workoutData.days.map((day) => ({
      ...day,
      exercises: day.exercises.map((exercise) => ({
        ...exercise,
        details: exercise.details || "",
      })),
    })),
  };
  localStorage.setItem("myWorkout", JSON.stringify(initialWorkout));

  window.location.href = "/weekView";
};
const Card = ({ img, title, id, text = "" }: Props) => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      {<img src={"/" + img + ".jpg"} />}
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{text}</p>
        <Button
          color="large"
          onClick={() => {
            handleClick(id);
          }}
        >
          View workout
        </Button>
      </div>
    </div>
  );
};

export default Card;
