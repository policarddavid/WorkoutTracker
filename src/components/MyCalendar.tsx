/// <reference types="vite-plugin-svgr/client" />
import { differenceInCalendarDays } from "date-fns";
declare var require: any;
import Calendar from "react-calendar";
import "./MyCalendar.css";
import { Workout } from "./Workout";
import { useRef, useState } from "react";
import Fire from "../assets/fire.svg?react";
let currentDay = 0;

function MyCalendar() {
  let storedWorkout: Workout = JSON.parse(localStorage.getItem("myWorkout")!);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [daySelected, setDay] = useState<number | 0>(0);
  const [dateSelected, setDate] = useState<Date>(new Date());
  const [dates, setDates] = useState<Date[]>([]);
  const handleCalendarClick = (day: Date) => {
    setDate(day);
    currentDay = day.getDay();
    if (currentDay === 0) {
      setDay(6);
    } else {
      setDay(currentDay - 1);
    }
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
        <dialog ref={dialogRef}>
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
          <button onClick={() => dialogRef.current?.close()}>Close</button>
          <button onClick={handleWorkoutComplete}>Workout Complete!</button>
        </dialog>
      }
    </div>
  );
}

export default MyCalendar;
