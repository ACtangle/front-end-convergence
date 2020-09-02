import React from "react";
import "./css/index.css";
import List from "./list";
import data from "./data";

class App extends React.Component {
  render() {
    return (
      <div className="friend-list">
        {data.map((item, index) => {
          return <List key={index} data={item} />;
        })}
      </div>
    );
  }
}

export default App;
