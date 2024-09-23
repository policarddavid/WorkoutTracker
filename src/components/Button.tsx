import React, { ReactNode } from "react";
import "./Button.css";
interface Props {
  children: ReactNode;
  onClick: () => void;
  color?: "small" | "large" | "light" | "dark" | "primary" | "week";
}
const Button = ({ children, onClick, color = "primary" }: Props) => {
  return (
    <button type="button" className={"btn btn-" + color} onClick={onClick}>
      {children}
    </button>
  );
};
export default Button;
