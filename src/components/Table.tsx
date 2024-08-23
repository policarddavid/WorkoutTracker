import React from "react";
import { Workout } from "./Workout";
import "./Table.css";
import Button from "./Button";
import { useRef, useState } from "react";

const Table: React.FC = () => {
  const [workout, setWorkout] = useState<Workout>(
    JSON.parse(localStorage.getItem("myWorkout")!)
  );
  const [updatedWorkout, setUpdatedWorkout] = useState<Workout>(
    JSON.parse(localStorage.getItem("myWorkout")!)
  );
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [daySelected, setDay] = useState<number | 0>(0);
  const handleEdit = (key: number) => {
    setDay(key);
    dialogRef.current?.showModal();
  };
  const handleExit = () => {
    (document.getElementById("editor") as HTMLFormElement)?.reset();
    setUpdatedWorkout(workout);
    dialogRef.current?.close();
  };
  const handleRemove = (key: number) => {
    let removedExercise = updatedWorkout;
    console.log("removing exercise");
    console.log(removedExercise.days[daySelected].exercises[key]);
    removedExercise.days[daySelected].exercises.splice(key, 1);
    setUpdatedWorkout(removedExercise);
    setWorkout(JSON.parse(localStorage.getItem("myWorkout")!));
  };

  const handleAdd = () => {
    let addedExercise = updatedWorkout;
    addedExercise.days[daySelected].exercises.push({ details: "" });
    setUpdatedWorkout(addedExercise);
    setWorkout(JSON.parse(localStorage.getItem("myWorkout")!));
  };
  const saveChanges = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //handle editing values
    const updatedWorkout = workout;
    const formValues = Array.from(event.currentTarget.elements);
    const inputValues = formValues
      .filter((element) => element instanceof HTMLInputElement)
      .map((input) => (input as HTMLInputElement).value);
    //delete all the exercies in the day
    updatedWorkout.days[daySelected].exercises = [];
    //for each value in inputValues, add a new exercise to the day
    inputValues.forEach((value) => {
      updatedWorkout.days[daySelected].exercises.push({ details: value });
    });

    dialogRef.current?.close();
    localStorage.setItem(`myWorkout`, JSON.stringify(updatedWorkout));
    setWorkout(JSON.parse(localStorage.getItem("myWorkout")!));
    console.log("changes saved");
    (document.getElementById("editor") as HTMLFormElement)?.reset();
  };
  return (
    <div className="table-responsive">
      <table className="table table-striped-columns">
        <thead>
          <tr>
            <th colSpan={workout.days.length}>{workout.name}</th>
          </tr>
          <tr>
            {workout.days.map((day, index) => (
              <th key={index}>
                {day.name}{" "}
                <Button onClick={() => handleEdit(index)} color="light">
                  Edit
                </Button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 1 }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {workout.days.map((day, columnIndex) => (
                <td key={columnIndex}>
                  {day.exercises.map((exercise, index) => (
                    <div key={index}>{exercise.details}</div>
                  ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <dialog ref={dialogRef}>
        <form onSubmit={saveChanges} id="editor">
          <table className="table">
            <thead>
              <tr>
                <th>{updatedWorkout.days[daySelected]?.name}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {updatedWorkout?.days[daySelected].exercises.map(
                    (exercise, index) => (
                      <div key={index}>
                        <input
                          name={index.toString()}
                          type="text"
                          defaultValue={exercise.details}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemove(index)}
                        >
                          remove
                        </button>
                      </div>
                    )
                  )}
                </td>
              </tr>
            </tbody>
            <button type="button" onClick={handleAdd}>
              add
            </button>
          </table>
          <button
            type="button"
            onClick={() => {
              handleExit();
            }}
          >
            Exit
          </button>
          <button type="submit">Save Changes</button>
        </form>
      </dialog>
    </div>
  );
};

export default Table;
