import React from "react";
import { Switch, Route } from "react-router-dom";
import "./Body.scss";
import SixDegreesForm from "../SixDegreesForm";
import TeammatesForm from "../TeammatesForm";

function Body() {
  return (
    <div id="body-wrapper">
      <div id="inner-body">
        <Switch>
          <Route exact path="/">
            <h1>Home</h1>
          </Route>
          <Route path="/six-degrees">
            <SixDegreesForm />
          </Route>
          <Route path="/teammates">
            <TeammatesForm />
          </Route>
          <Route path="/height-and-weight">
            <h1>Under Construction!</h1>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Body;
