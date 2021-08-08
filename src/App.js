import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.scss";

import SixDegreesForm from "./components/SixDegreesForm";
import TeammatesForm from "./components/TeammatesForm";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
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
