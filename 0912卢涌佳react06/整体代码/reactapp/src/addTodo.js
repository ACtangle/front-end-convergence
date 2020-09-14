import React from "react";
import { useDispatch } from "react-redux";

export default function AddTodo() {
  const dispatch = useDispatch();
  return (
    <div id="create-todo">
      <input
        id="new-todo"
        placeholder="What needs to be done?"
        autoComplete="off"
        type="text"
        onKeyDown={({ keyCode, target }) => {
          let val = target.value;
          if (keyCode == 13 && val.trim()) {
            dispatch({
              type: "ADD_TODO",
              title: val,
              done: false,
            });
            target.value = "";
          }
        }}
      />
    </div>
  );
}
