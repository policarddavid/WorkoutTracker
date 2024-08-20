import ListGroup from "./ListGroup";
import Message from "./Message";
import { Workout } from "./Workout";

interface HomeProps {
  workoutList: Workout[];
}
function Home({ workoutList }: HomeProps) {
  const handleSelectItem = (key: string) => {
    window.location.href = `/${key}`;
  };
  let workoutNames: string[];
  let workoutIds: string[];
  workoutNames = workoutList.map((workout) => workout.name);
  workoutIds = workoutList.map((workout) => workout.id);
  return (
    <div className="parent">
      <ListGroup
        items={workoutNames}
        keys={workoutIds}
        heading="What type of workout split are you interested in?"
        onSelectItem={handleSelectItem}
      />
      <Message text={"Or create your own workout plan"}></Message>
      <ListGroup
        items={["Custom workout plan"]}
        keys={["CustomWorkoutPlan"]}
        onSelectItem={handleSelectItem}
      />
    </div>
  );
}

export default Home;
