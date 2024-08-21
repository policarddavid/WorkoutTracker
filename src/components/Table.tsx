import React from "react";
import { Workout } from "./Workout";
import "./Table.css";

interface TableProps {
  workout: Workout;
}

const Table: React.FC<TableProps> = ({ workout }: TableProps) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped-columns">
        <thead>
          <th colSpan={workout.days.length}>{workout.name}</th>
          <tr>
            {workout.days.map((day, index) => (
              <th key={index}>{day.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 1 }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {workout.days.map((day, columnIndex) => (
                <td key={columnIndex}>
                  {day.exercises.map((exercise, index) => (
                    <div>{exercise.name}</div>
                  ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
