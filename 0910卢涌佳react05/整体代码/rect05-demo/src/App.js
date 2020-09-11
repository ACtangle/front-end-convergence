import React, { Fragment } from "react";
import "./static/index.css";
import List from "./views/list";
import { Route, Switch, Redirect } from "react-router-dom";
import Page404 from "./views/page404";

const indexType = ["all", "good", "share", "ask"];

function App() {
  return (
    <Fragment>
      {/* 路由 */}
      <Switch>
        <Route
          path="/"
          exact
          render={() => {
            return <Redirect to="/all" />;
          }}
        ></Route>
        <Route
          path={[
            "/all",
            "/all/:type",
            "/all/:type/:page",
            "/essence",
            "/essence/:type",
            "/essence/:type/:page",
            "/share",
            "/share/:type",
            "/share/:type/:page",
            "/ask",
            "/ask/:type",
            "/ask/:type/:page",
          ]}
          exact
          render={(routeProps) => {
            const { params } = routeProps.match;
            const { type = "good", page = 1 } = params;
            if (
              indexType.includes(type) &&
              page + "" === parseInt(page) + "" &&
              page > 0
            ) {
              return <List {...routeProps} />;
            }
            return <Page404 />;
          }}
        />
        <Route
          component={(routeProps) => {
            return <Page404 {...routeProps} />;
          }}
        />
      </Switch>
    </Fragment>
  );
}

export default App;
