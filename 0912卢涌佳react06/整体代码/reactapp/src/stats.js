import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Stats() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  let doneLen = data.filter((item) => item.done).length;
  let unDoneLen = data.length - doneLen;
  return (
    <div id="todo-stats">
      <span className="todo-count">
        <span className="number">{unDoneLen}</span>
        <span className="word">项待完成</span>
      </span>
      {doneLen > 0 ? (
        <span className="todo-clear">
          <a
            onClick={() => {
              dispatch({
                type: "DELETE_ALL_DONE",
              });
            }}
          >
            Clear <span>{doneLen}</span> 已完成事项
          </a>
        </span>
      ) : (
        ""
      )}
    </div>
  );
}
