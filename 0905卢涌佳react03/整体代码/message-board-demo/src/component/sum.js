import React from "react";

export default class Sum extends React.Component {
  render() {
    let { data, checked, setAllChecked, removeAll } = this.props;
    let isCheckedCount = data.filter((item) => item.isChecked).length;
    return (
      <div className="sum">
        <label>
          <input
            type="checkbox"
            checked={checked}
            onChange={({ target }) => {
              setAllChecked(target.checked);
            }}
          />
          <span>选中全部</span>
        </label>
        <a
          onClick={() => {
            removeAll();
          }}
        >
          删除选中项
        </a>
        <p>
          当前选中{isCheckedCount}项，共{data.length}条留言
        </p>
      </div>
    );
  }
}
