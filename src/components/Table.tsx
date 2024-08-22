import React from "react";
import { Workout } from "./Workout";
import { useForm } from "react-hook-form";
import "./Table.css";
import Button from "./Button";
import { useRef, useState } from "react";

const Table: React.FC = () => {
  const { reset } = useForm();
  const [workout, setWorkout] = useState<Workout>(
    JSON.parse(localStorage.getItem("myWorkout")!)
  );
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [daySelected, setDay] = useState<number | 0>(0);
  const handleEdit = (key: number) => {
    setDay(key);
    dialogRef.current?.showModal();
  };
  const saveChanges = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedWorkout = workout;
    const formValues = Array.from(event.currentTarget.elements);
    const inputValues = formValues
      .filter((element) => element instanceof HTMLInputElement)
      .map((input) => input.value);
    console.log(inputValues);
    inputValues.map(
      (value, index) =>
        (updatedWorkout.days[daySelected].exercises[index].details = value)
    );
    dialogRef.current?.close();
    localStorage.setItem(`myWorkout`, JSON.stringify(updatedWorkout));
    setWorkout(JSON.parse(localStorage.getItem("myWorkout")!));
    console.log("changes saved");
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
        <form onSubmit={saveChanges}>
          <table className="table">
            <thead>
              <tr>
                <th>{workout.days[daySelected]?.name}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {workout?.days[daySelected].exercises.map(
                    (exercise, index) => (
                      <div key={index}>
                        <input
                          name={index.toString()}
                          type="text"
                          placeholder={exercise.details}
                        />
                      </div>
                    )
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <button
            type="button"
            onClick={() => {
              dialogRef.current?.close();
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
