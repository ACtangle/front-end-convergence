import React from "react";
// 受控组件
export default class Form extends React.Component {
  state = {
    username: "",
    message: "",
    isChecked: false,
  };
  addMessageClick = () => {
    const { addNewItem } = this.props;
    let { username, message, isChecked } = this.state;
    console.log(username, message);
    if (username === "" || message === "") return alert("内容不能为空");
    addNewItem({
      id: Math.ceil(Math.random() * 100000),
      username,
      message,
      isChecked,
    });
    this.setState({
      username: "",
      message: "",
    });
  };
  render() {
    return (
      <div className="addMessage">
        <input
          type="text"
          placeholder="请输入昵称"
          value={this.state.username}
          onChange={(e) => {
            this.setState({
              username: e.target.value,
            });
          }}
        />
        <textarea
          placeholder="请输入留言"
          value={this.state.message}
          onChange={(e) => {
            this.setState({
              message: e.target.value,
            });
          }}
        ></textarea>
        <button onClick={this.addMessageClick}>提交留言</button>
      </div>
    );
  }
}
