import React from "react";
import { Link } from "react-router-dom";
import Img1 from "../img/img_1.png";
import Img2 from "../img/img_2.png";
import Img4 from "../img/img4.png";

export default function Nav() {
  return (
    <React.Fragment>
      <header className="header">
        <div className="wrap">
          <h1 id="logo">KaiKeBa</h1>
          <nav className="nav">
            <Link to="/">首页</Link>
            <Link to="/about">关于我们</Link>
            <Link to="/join">加入我们</Link>
          </nav>
        </div>
      </header>
      <img src={Img4} className="banner" alt="" />
      <div className="wrap">
        <img src={Img1} alt="" />
        <img src={Img2} alt="" />
      </div>
    </React.Fragment>
  );
}
