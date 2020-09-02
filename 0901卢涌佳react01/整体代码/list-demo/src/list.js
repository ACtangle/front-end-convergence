import React from "react";

export default class List extends React.Component {
  state = {
    show: false,
  };

  dlClickHandle = () => {
    let { show } = this.state;

    this.setState({
      show: !show,
    });
  };

  render() {
    let { show } = this.state;
    let {
      data: { name, children },
    } = this.props;

    return (
      <dl className={show ? "friend-group expanded" : "friend-group"}>
        <dt onClick={this.dlClickHandle}>{name}</dt>
        {children.map((chid, index) => {
          return <dd key={index}>{chid.name}</dd>;
        })}
      </dl>
    );
  }
}
