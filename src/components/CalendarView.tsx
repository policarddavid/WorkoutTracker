import MyCalendar from "./MyCalendar";
import Nav from "./Nav";
import "./CalendarView.css";
import "./Nav.css";

const CalendarView: React.FC = () => {
  return (
    <div className="view-calendar">
      <Nav />
      <div className="calendar">
        <MyCalendar />
      </div>
    </div>
  );
};

export default CalendarView;
