import React, { ReactNode } from "react";
import "./Button.css";
interface Props {
  children: ReactNode;
  onClick: () => void;
  color?:
    | "small"
    | "large"
    | "light"
    | "dark"
    | "primary"
    | "week"
    | "transparent";
  disabled?: boolean;
  target?: string;
}
const Button = ({
  children,
  onClick,
  color = "primary",
  disabled = false,
  target = "",
}: Props) => {
  return (
    <button
      data-toggle="modal"
      data-target={target}
      type="button"
      className={"btn btn-" + color}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Button;
