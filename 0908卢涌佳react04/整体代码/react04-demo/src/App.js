import React, { Fragment } from "react";
import Nav from "./components/nav";
import "./css/index.css";
import { Route } from "react-router";
import about from "./view/about";
import join from "./view/join";
import index from "./view/index";

function App() {
  return (
    <Fragment>
      <Route path={["/", "/home"]} exact component={index} />
      <Route path={["/about"]} exact strict component={about} />
      <Route path={["/join"]} exact component={join} />
    </Fragment>
  );
}

export default App;
