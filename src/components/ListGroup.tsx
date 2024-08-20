interface Props {
  items: string[];
  keys: string[];
  heading?: string;
  onSelectItem: (key: string) => void;
}
import { useState } from "react";
function ListGroup({ items, keys, heading = "", onSelectItem }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  useState;
  return (
    <>
      {heading !== "" && <h1>{heading}</h1>}
      {items.length === 0 && <p>No items to display</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              index === selectedIndex
                ? "list-group-item active"
                : "list-group-item"
            }
            key={keys[index]}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(keys[index]);
            }}
          >
            <div style={{ textAlign: "center" }}>{item}</div>
          </li>
        ))}
      </ul>
    </>
  );
}
export default ListGroup;
