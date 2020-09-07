import React from "react";
import "./css/index.css";
import Form from "./component/form";
import List from "./component/list";

class App extends React.Component {
  state = {
    data: [],
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
  render() {
    return (
      <section className="wrap">
        <h2 className="title">留言板</h2>
        <Form addNewItem={this.addNewItem} />
        <List data={this.state.data} deleteItem={this.deleteItem} />
      </section>
    );
  }
}

export default App;
