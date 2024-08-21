import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./MyCalendar.css";
import { Workout } from "./Workout";

interface MyCalendarProps {
  workout: Workout;
}

function MyCalendar({ workout }: MyCalendarProps) {
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
