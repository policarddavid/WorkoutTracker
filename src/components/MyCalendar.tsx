import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./MyCalendar.css";
import { Workout } from "./Workout";

function MyCalendar(workout: Workout) {
  const handleCalendarClick = (day: Date) => {
    // Add your logic here
    console.log(day.getDay());
  };

  return (
    <div>
      <Calendar onClickDay={handleCalendarClick} />
    </div>
  );
}

export default MyCalendar;
