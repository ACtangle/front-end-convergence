import { createStore } from "redux";

const reducer = (
  state = {
    // 聚焦锁 true代表被占用，false代表不占用
    flag: true,
    data: [
      {
        id: 1,
        title: "今天晚上升颗星啊",
        done: true,
      },
      {
        id: 2,
        title: "本周给大家录10集补充知识",
        done: false,
      },
    ],
  },
  action
) => {
  switch (action.type) {
    // 添加单项
    case "ADD_TODO":
      return {
        ...state,
        data: [
          ...state.data,
          {
            id: Date.now(),
            title: action.title,
            done: action.done,
          },
        ],
      };
    // 删除单项
    case "DELETE_TODO":
      return {
        ...state,
        data: state.data.filter((item) => {
          return item.id !== action.id;
        }),
      };
    // 改变当前项的复选框状态
    case "CHANGE_DONE":
      return {
        ...state,
        data: state.data.map((item) => {
          if (item.id === action.id) item.done = action.done;
          return item;
        }),
      };
    // 删除所有已做完的子项
    case "DELETE_ALL_DONE":
      return {
        ...state,
        data: state.data.filter((item) => !item.done),
      };
    // 修改当前项的内容
    case "CHANGE_MESSAGE":
      return {
        ...state,
        data: state.data.map((item) => {
          if (item.id === action.id) {
            item.title = action.title;
          }
          return item;
        }),
      };
    // 占用或释放组件互斥锁
    case "BIND_FLAG":
      console.log(action.flag);
      return {
        ...state,
        data: [...state.data],
        flag: action.flag,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
