import Table from "./Table";
import Button from "./Button";
import "./WeekView.css";
import NavBar from "./NavBar";
import "./Nav.css";

const WeekView = () => {
  return (
    <div className="weekpage">
      <div className="tableContainer">
        <Table />
      </div>
      <Button
        onClick={() => (window.location.href = `/CalendarView`)}
        color="large"
      >
        View Calendar
      </Button>
      <NavBar />
    </div>
  );
};

export default WeekView;
