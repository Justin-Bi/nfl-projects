import React from "react";
import { Switch, Route } from "react-router-dom";
import "./Body.scss";
import Home from "../Home";
import SixDegreesForm from "../SixDegreesForm";
import TeammatesForm from "../TeammatesForm";
import ConnectionGame from "../ConnectionGame";
import PageNotFound from "../PageNotFound";

function Body() {
  return (
    <div id="body-wrapper">
      <div id="inner-body">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/six-degrees">
            <SixDegreesForm />
          </Route>
          <Route path="/teammates">
            <TeammatesForm />
          </Route>
          <Route path="/connection-game">
            <ConnectionGame />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Body;
