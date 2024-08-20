import ListGroup from "./ListGroup";
import { Workout } from "./Workout";

function WorkoutGen({ name, id, exercises }: Workout) {
  return (
    <div>
      <ListGroup
        items={exercises}
        keys={exercises.map((exercise) => exercise.replace(" ", ""))}
        heading={name}
        onSelectItem={(item: string) => console.log(item)} // onSelectItem is a function that takes a string as an argument and returns void
      />
    </div>
  );
}

export default WorkoutGen;
