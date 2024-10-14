import MyCalendar from "./MyCalendar";
import NavBar from "./NavBar";
import "./CalendarView.css";
import "./Nav.css";

const CalendarView: React.FC = () => {
  return (
    <div className="view-calendar">
      <div className="calendar">
        <MyCalendar />
      </div>
      <NavBar />
    </div>
  );
};

export default CalendarView;
