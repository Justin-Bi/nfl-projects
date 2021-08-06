import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";

import SixDegreesForm from "./components/SixDegreesForm";
import TeammatesForm from "./components/TeammatesForm/TeammatesForm";

function App() {
  return (
    <div className="App">
      <Router>
        <ul>
          <li>
            <Link to="/six-degrees">Six Degrees of Separation</Link>
          </li>
          <li>
            <Link to="/teammates">Teammates</Link>
          </li>
          <li>
            <Link to="/height-and-weight">Height and Weight</Link>
          </li>
        </ul>
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
      </Router>
    </div>
  );
}

export default App;
