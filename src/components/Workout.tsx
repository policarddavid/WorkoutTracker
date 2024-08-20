import ListGroup from "./ListGroup";

interface Props {
  name: string;
  id: string;
  exercises: string[];
}

function Workout({ name, id, exercises }: Props) {
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

export default Workout;
