import React from "react";
import Li from "./li";

export default class List extends React.Component {
  render() {
    let { data, deleteItem, changeChecked, changeMessage } = this.props;
    if (data.length === 0) return <p>暂时无人评论，赶紧抢沙发吧！</p>;
    return (
      <ul className="messageList">
        {data.map((item) => {
          return (
            <Li
              key={item.id}
              item={item}
              deleteItem={deleteItem}
              changeChecked={changeChecked}
              changeMessage={changeMessage}
            />
          );
        })}
      </ul>
    );
  }
}
