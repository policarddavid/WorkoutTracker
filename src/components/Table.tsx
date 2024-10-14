import React, { useState, useEffect, useRef } from "react";
import { EditOutlined, StopOutlined, PlusOutlined } from "@ant-design/icons";
import { Workout } from "./Workout";
import "./Table.css";
import Button from "./Button";
import customworkoutdata from "../assets/customworkout.json";
import axios from "axios";
import { Modal, Button as ModalButton } from "react-bootstrap";
import config from "../../config";

const Table: React.FC = () => {
  const apiIp: string = config.apiIp;
  const [show, setShow] = useState(false);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("loggedIn"));
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    setLoggedIn(localStorage.getItem("loggedIn"));
  });

  if (!localStorage.getItem("myWorkout")) {
    localStorage.setItem("myWorkout", JSON.stringify(customworkoutdata));
  }

  const [workout, setWorkout] = useState<Workout>(
    JSON.parse(localStorage.getItem("myWorkout")!)
  );
  const [updatedWorkout, setUpdatedWorkout] = useState<Workout>(
    JSON.parse(localStorage.getItem("myWorkout")!)
  );
  const getUserData = () => {
    if (loggedIn) {
      axios
        .get(`${apiIp}/user/`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        })
        .then((response) => {
          localStorage.setItem(`myWorkout`, JSON.parse(response.data.workout));
          setWorkout(JSON.parse(localStorage.getItem("myWorkout")!));
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  };
  const saveUserData = () => {
    if (loggedIn) {
      axios
        .post(
          `${apiIp}/updateWorkout/`,
          { workout: JSON.stringify(localStorage.getItem("myWorkout")!) },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          }
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  };
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
    (document.getElementById("editor") as HTMLFormElement)?.reset();
  };
  return (
    <div className="myTable">
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Login Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>You need to log in to perform this action!</Modal.Body>
        <Modal.Footer>
          <Button color="small" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <table className="table table-striped-columns">
        <thead>
          <tr className="titleRow">
            <th colSpan={workout.days.length}>
              <div className="workoutName">
                <Button
                  onClick={!loggedIn ? () => handleShow() : () => getUserData()}
                  color="week"
                >
                  Load your workout
                </Button>
                <div>{workout.name}</div>
                <Button
                  onClick={
                    !loggedIn ? () => handleShow() : () => saveUserData()
                  }
                  color="week"
                >
                  Save current workout
                </Button>
              </div>
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
