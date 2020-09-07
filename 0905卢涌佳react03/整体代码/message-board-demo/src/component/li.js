import React, { createRef } from "react";

export default class Li extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      val: props.item.message,
    };
  }
  editTextareaRef = createRef();
  componentDidUpdate(prevProps, prevState) {
    //组件更新完成之后
    //判断当前是否是进入编辑状态
    if (!prevState.edit && this.state.edit) {
      // console.log(this.editTextareaRef);
      this.editTextareaRef.current.focus();
    }
  }
  render() {
    let { item, deleteItem, changeChecked, changeMessage } = this.props;
    let { edit, val } = this.state;
    return (
      <li className={edit ? "editing" : ""}>
        <h3>{item.username}</h3>
        <input
          type="checkbox"
          checked={item.isChecked}
          onChange={({ target }) => {
            changeChecked(item.id, target.checked);
          }}
        />
        <p
          onDoubleClick={() => {
            this.setState({ edit: true });
          }}
        >
          {item.message}
        </p>
        <textarea
          ref={this.editTextareaRef}
          value={val}
          onChange={({ target }) => {
            this.setState({ val: target.value });
          }}
          onBlur={() => {
            if (val.trim()) {
              changeMessage(item.id, val);
            } else {
              this.setState({
                val: item.message,
              });
            }
            this.setState({ edit: false });
          }}
        ></textarea>
        <a
          onClick={() => {
            deleteItem(item.id);
          }}
        >
          删除
        </a>
      </li>
    );
  }
}
