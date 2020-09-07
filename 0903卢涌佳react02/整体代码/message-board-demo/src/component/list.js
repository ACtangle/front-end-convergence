import React from "react";
// 留言区组件
export default class List extends React.Component {
  render() {
    let { data, deleteItem } = this.props;
    if (data.length === 0) return <p>暂时无人评论，赶紧抢沙发吧！</p>;
    return (
      <ul className="messageList">
        {data.map((item) => {
          return (
            <li key={item.id}>
              <h3>{item.username}</h3>
              <p>{item.message}</p>
              <a
                onClick={() => {
                  deleteItem(item.id);
                }}
              >
                删除
              </a>
            </li>
          );
        })}
      </ul>
    );
  }
}
