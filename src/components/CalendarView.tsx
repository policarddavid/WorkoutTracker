import MyCalendar from "./MyCalendar";
import Nav from "./Nav";
import "./CalendarView.css";
import "./Nav.css";

const CalendarView: React.FC = () => {
  return (
    <div className="view-calendar">
      <div className="calendar">
        <MyCalendar />
      </div>
      <Nav />
    </div>
  );
};

export default CalendarView;
