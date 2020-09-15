import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Li(props) {
  // 聚焦的表单ref
  let editIptRef = useRef();

  // 父组件传递数据
  let { done, title, id } = props.item;

  // 该子组件的私有属性
  let [edit, setEdit] = useState(false);
  let [val, setVal] = useState(title);

  // 判断组件是否为初始化时期
  let [isInitial, setIsInitial] = useState(false);

  // 调用redux钩子
  const dispatch = useDispatch();

  // 组件表单聚焦互斥锁
  // const flag = useSelector((state) => state.flag);

  // useEffect(() => {
  //   if (!isInitial) {
  //     console.log(`id-${id}:组件初始化`);
  //     setIsInitial(true);
  //   } else {
  //     // 组件更新
  //     console.log(`id-${id}:组件更新`);
  //   }
  // }, [title]);

  // 组件更新时聚焦表单互斥可编辑
  useEffect(() => {
    if (!isInitial) {
      console.log(`id-${id}:组件初始化`);
      setIsInitial(true);
    }
    if (edit) {
      console.log(`Li -> id-${id} -> edit`, edit);
      editIptRef.current.focus();
    }
  }, [edit]);

  return (
    <li className={edit ? "editing" : ""}>
      <div className={`todo ${done ? "done" : ""}`}>
        <div className="display">
          <input
            className="check"
            type="checkbox"
            checked={done}
            onChange={({ target }) => {
              dispatch({
                type: "CHANGE_DONE",
                id,
                done: target.checked,
              });
            }}
          />
          <div
            className="todo-content"
            onDoubleClick={() => {
              // if (flag) {
              // 如果锁未占用，设置为占用状态
              // dispatch({
              //   type: "BIND_FLAG",
              //   flag: false,
              // });
              setEdit(true);
              // }
            }}
          >
            {title}
          </div>
          <span
            className="todo-destroy"
            onClick={() => {
              dispatch({
                type: "DELETE_TODO",
                id,
              });
            }}
          ></span>
        </div>
        {/* 可编辑区域 */}
        <div className="edit">
          <input
            className="todo-input"
            type="text"
            ref={editIptRef}
            value={val}
            onChange={({ target }) => {
              setVal(target.value);
            }}
            onBlur={({ target }) => {
              if (title.trim()) {
                dispatch({
                  type: "CHANGE_MESSAGE",
                  id,
                  title: target.value,
                });
                // 失去焦点后释放占用的锁flag
                // dispatch({
                //   type: "BIND_FLAG",
                //   flag: true,
                // });
              } else {
                console.log("???");
              }
              setEdit(false);
            }}
          />
        </div>
      </div>
    </li>
  );
}
