import Button from "./components/Button";
import ListGroup from "./components/ListGroup";
import Message from "./components/Message";
import "./App.css";

function App() {
  return (
    <div className="parent">
      <ListGroup
        items={["Arnold split", "Push-Pull-Legs", "Custom workout plan"]}
        heading="What type of workout split are you interested in?"
        onSelectItem={(item) => console.log(item)} // onSelectItem is a function that takes a string as an argument and returns void
      />
    </div>
  );
}

export default App;
