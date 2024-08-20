import ListGroup from "./ListGroup";
import { Workout } from "./Workout";
import Table from "./Table";

interface Props {
  workout: Workout;
}

// Rest of the code...

function WorkoutGen({ workout }: Props) {
  return (
    <div>
      <Table workout={workout} />
    </div>
  );
}

export default WorkoutGen;
