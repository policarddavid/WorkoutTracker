"use client";
import { addDays, differenceInCalendarDays } from "date-fns";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../MyCalendar.css";
import { Workout } from "../Workout";
import { useRef, useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

interface userinfoInterface {
  id: number;
  first_name: string;
  username: string;
  email: string;
}
interface MyCalendarProps {
  workout: Workout;
}
const week = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let currentDay = 0;

function MyCalendar({ workout }: MyCalendarProps) {
  const [userInfos, setUserInfos] = useState<userinfoInterface>();
  const { authTokens, setLoading } = useContext(AuthContext);
  const { callLogout } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get<userinfoInterface>("http://127.0.0.1:8000/user/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      })
      .then((response) => {
        setUserInfos(response.data);
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
      <p>
        Name: <span>{userInfos?.first_name}</span>
      </p>
      <p>{/* Email: <span>{userInfos?.email}</span> */}</p>
      <p>
        Username: <span>{userInfos?.username}</span>
      </p>
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
                      <div key={index}>{exercise.printExerciseDetails()}</div>
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
      <button onClick={callLogout}>Log out</button>
    </div>
  );
}

export default MyCalendar;
