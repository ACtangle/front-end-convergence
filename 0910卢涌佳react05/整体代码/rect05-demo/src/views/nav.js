import React from "react";
import { NavLink } from "react-router-dom";

export default function Nav(props) {
  return (
    <nav className="nav">
      <NavLink to="/all">全部</NavLink>
      <NavLink to="/essence/good">精华</NavLink>
      <NavLink to="/share/share">分享</NavLink>
      <NavLink to="/ask/ask">问答</NavLink>
    </nav>
  );
}
