import React from "react";
import "./App.css";
import SixDegreesForm from "./components/SixDegreesForm";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path="/">
          <h1>Home</h1>
        </Route>
        <Route path="/about">
          <h1>About</h1>
        </Route>
        <Route path="/dashboard">
          <h1>Dashboard</h1>
        </Route>
      </Switch>
      <div className="App">
        <SixDegreesForm />
      </div>
    </Router>
  );
}

export default App;
