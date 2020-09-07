import React from "react";
import "./css/index.css";
import Form from "./component/form";
import List from "./component/list";
import Sum from "./component/sum";

class App extends React.Component {
  state = {
    data: [
      { id: 0, username: "melon", message: "fucking man", isChecked: true },
      {
        id: 1,
        username: "apple",
        message: "surprise mother fucker",
        isChecked: false,
      },
    ],
    checked: false,
  };
  addNewItem = (item) => {
    this.state.data.unshift(item);
    this.setState({
      data: this.state.data,
    });
    console.log(this.state.data);
  };
  deleteItem = (id) => {
    this.setState({
      data: this.state.data.filter((item) => item.id !== id),
    });
    console.log(this.state.data);
  };
  changeChecked = (id, checkedValue) => {
    let { data, checked } = this.state;
    data.forEach((item) => {
      if (item.id === id) {
        item.isChecked = checkedValue;
      }
    });
    if (data.length === data.filter((item) => item.isChecked).length) {
      console.log(data);
      checked = true;
    } else {
      checked = false;
    }
    this.setState({
      data,
      checked,
    });
  };
  setAllChecked = (flag) => {
    let { data, checked } = this.state;
    data.forEach((item) => {
      item.isChecked = flag;
    });
    checked = flag;
    this.setState({ data, checked });
  };
  removeAll = () => {
    let { data, checked } = this.state;
    checked = false;
    if (data.length === 0) {
      this.setState({ checked });
      return alert("请输入内容，再删除哦");
    }
    let result = data.filter((item) => !item.isChecked);
    this.setState({ data: result, checked });
  };
  changeMessage = (id, val) => {
    let { data } = this.state;
    data.forEach((item) => {
      if (item.id === id) item.message = val;
    });
    this.setState({ data });
    console.log(data);
  };
  render() {
    return (
      <section className="wrap">
        <h2 className="title">留言板</h2>
        <Form addNewItem={this.addNewItem} />
        <List
          data={this.state.data}
          deleteItem={this.deleteItem}
          changeChecked={this.changeChecked}
          changeMessage={this.changeMessage}
        />
        <Sum
          data={this.state.data}
          checked={this.state.checked}
          setAllChecked={this.setAllChecked}
          removeAll={this.removeAll}
        />
      </section>
    );
  }
}

export default App;
