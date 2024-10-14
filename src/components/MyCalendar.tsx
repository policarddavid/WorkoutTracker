/// <reference types="vite-plugin-svgr/client" />
import { differenceInCalendarDays, set } from "date-fns";
import Calendar from "react-calendar";
import "./MyCalendar.css";
import Button from "./Button";
import { Workout } from "./Workout";
import { useRef, useState, useEffect } from "react";
import Fire from "../assets/fire.svg?react";
import customworkoutdata from "../assets/customworkout.json";
import axios from "axios";
import config from "../../config";

let currentDay = 0;

function MyCalendar() {
  const apiIp: string = config.apiIp;
  if (
    !localStorage.getItem("myWorkout") ||
    localStorage.getItem("myWorkout") === ""
  ) {
    localStorage.setItem("myWorkout", JSON.stringify(customworkoutdata));
  }
  let storedWorkout: Workout = JSON.parse(localStorage.getItem("myWorkout")!);

  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [daySelected, setDay] = useState<number | 0>(0);
  const [dateSelected, setDate] = useState<Date>(new Date());
  const [dates, setDates] = useState<Date[]>([]);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("loggedIn"));
  useEffect(() => {
    setLoggedIn(localStorage.getItem("loggedIn"));
  }, []);
  useEffect(() => {
    if (loggedIn && localStorage.getItem("calendar") != "") {
      setDates(JSON.parse(localStorage.getItem("calendar")!));
    }
  }, []);
  const handleCalendarClick = (day: Date) => {
    setDate(day);
    currentDay = day.getDay();
    setDay(currentDay);
    dialogRef.current?.showModal();
  };
  function isSameDay(a: Date, b: Date) {
    return differenceInCalendarDays(a, b) === 0;
  }
  function tileContent({ date, view }: { date: Date; view: string }) {
    if (view === "month") {
      if (dates.find((dDate) => isSameDay(dDate, date))) {
        return (
          <Fire
            style={{
              width: 55,
              height: 55,
              position: "absolute",
              bottom: 0,
              left: -2,
              zIndex: -1,
            }}
          />
        );
      }
    }
  }
  function tileClassName({ date, view }: { date: Date; view: string }) {
    if (view === "month" && dates.find((dDate) => isSameDay(date, dDate))) {
      return ["disabled"];
    }
  }
  function handleWorkoutComplete() {
    dialogRef.current?.close();
    const updatedDates = [...dates, dateSelected];
    setDates(updatedDates);
    localStorage.setItem("calendar", JSON.stringify(updatedDates));
    if (loggedIn) {
      axios
        .post(
          `${apiIp}/updateCalendar/`,
          { calendar: JSON.stringify(localStorage.getItem("calendar")!) },
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
  }
  return (
    <div className="myCalendar">
      {
        <Calendar
          calendarType="gregory"
          onClickDay={handleCalendarClick}
          tileClassName={tileClassName}
          tileContent={tileContent}
          formatWeekday={(locale, date) => ""}
        />
      }
      {
        <dialog className="dialog" ref={dialogRef}>
          <table className="table">
            <thead>
              <tr>
                <th>{storedWorkout?.name}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {storedWorkout?.days[daySelected].exercises.map(
                    (exercise, index) => (
                      <div key={index}>{exercise.details}</div>
                    )
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <Button color="week" onClick={() => dialogRef.current?.close()}>
            Close
          </Button>
          <Button color="week" onClick={handleWorkoutComplete}>
            Workout Complete!
          </Button>
        </dialog>
      }
    </div>
  );
}

export default MyCalendar;
