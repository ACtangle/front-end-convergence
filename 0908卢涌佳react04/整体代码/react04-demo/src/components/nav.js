import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <Link to="/">首页</Link>
      <span> | </span>
      <Link to="/about">关于我们</Link>
      <span> | </span>
      <Link to="/join">加入我们</Link>
    </nav>
  );
}

export default Nav;
