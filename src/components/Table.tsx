import React from "react";
import { EditOutlined, StopOutlined, PlusOutlined } from "@ant-design/icons";
import { Workout } from "./Workout";
import "./Table.css";
import Button from "./Button";
import { useRef, useState } from "react";
import customworkoutdata from "../assets/customworkout.json";

const Table: React.FC = () => {
  if (!localStorage.getItem("myWorkout")) {
    localStorage.setItem("myWorkout", JSON.stringify(customworkoutdata));
  }

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
    <div className="myTable">
      <table className="table table-striped-columns">
        <thead>
          <tr>
            <th className="workoutName" colSpan={workout.days.length}>
              {workout.name}
            </th>
          </tr>
          <tr>
            {workout.days.map((day, index) => (
              <th key={index}>
                <Button onClick={() => handleEdit(index)} color="week">
                  {
                    <div>
                      {day.name} <EditOutlined />
                    </div>
                  }
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
      <dialog className="editDay" ref={dialogRef}>
        <form onSubmit={saveChanges} id="editor">
          <table className="table custom">
            <thead>
              <tr>
                <th>{updatedWorkout.days[daySelected]?.name}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div>
                    {updatedWorkout?.days[daySelected].exercises.map(
                      (exercise, index) => (
                        <div key={index} className="exerciseList">
                          <input
                            className="exerciseInput"
                            name={index.toString()}
                            type="text"
                            defaultValue={exercise.details}
                          />
                          <Button
                            color="transparent"
                            onClick={() => handleRemove(index)}
                          >
                            <StopOutlined />
                          </Button>
                        </div>
                      )
                    )}
                    <Button color="transparent" onClick={handleAdd}>
                      <PlusOutlined />
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="formButtons">
            <button
              className="formControl"
              onClick={() => {
                handleExit();
              }}
            >
              Exit
            </button>
            <button className="formControl" type="submit">
              Save
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default Table;
