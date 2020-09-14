import React from "react";
import Li from "./li";
import { useSelector } from "react-redux";

export default function Todo() {
  const data = useSelector((state) => state.data);
  return (
    <ul id="todo-list">
      {data.map((item) => (
        <Li key={item.id} item={item} />
      ))}
    </ul>
  );
}
