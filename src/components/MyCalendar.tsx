"use client";
import { addDays, differenceInCalendarDays } from "date-fns";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./MyCalendar.css";
import { Workout } from "./Workout";
import { useRef, useState } from "react";
const week = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
interface MyCalendarProps {
  workout: Workout;
}
let currentDay = 0;

function MyCalendar({ workout }: MyCalendarProps) {
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
  function tileClassName({ date, view }: { date: Date; view: string }) {
    if (view === "month" && dates.find((dDate) => isSameDay(date, dDate))) {
      return "highlight";
    }
  }
  function handleWorkoutComplete() {
    dialogRef.current?.close();
    const updatedDates = [...dates, dateSelected];
    setDates(updatedDates);
    console.log(dates);
  }
  return (
    <div>
      {
        <Calendar
          onClickDay={handleCalendarClick}
          tileClassName={tileClassName}
        />
      }
      {
        <dialog ref={dialogRef}>
          <table className="table">
            <thead>
              <tr>
                <th>{workout.name}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {workout.days[daySelected].exercises.map(
                    (exercise, index) => (
                      <div key={index}>{exercise.name}</div>
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
