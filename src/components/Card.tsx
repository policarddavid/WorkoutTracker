import React, { ReactNode } from "react";
import Button from "./Button";
interface Props {
  img: ReactNode;
  title: string;
  text?: string;
}
const Card = ({ img, title, text = "" }: Props) => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      {img}
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{text}</p>
        <Button
          color="large"
          onClick={() => (window.location.href = "/weekView")}
        >
          View workout
        </Button>
      </div>
    </div>
  );
};

export default Card;
