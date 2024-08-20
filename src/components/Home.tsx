import ArnoldSplit from "./ArnoldSplit";
import ListGroup from "./ListGroup";
import Message from "./Message";
import Workout from "./Workout";

function Home() {
  const handleSelectItem = (key: string) => {
    window.location.href = `/${key}`;
  };
  const workouts: string[] = ["Arnold Split", "Push-Pull-Legs"];
  const workoutids: string[] = ["ArnoldSplit", "PPL"];
  return (
    <div className="parent">
      <ListGroup
        items={workouts}
        keys={workoutids}
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
