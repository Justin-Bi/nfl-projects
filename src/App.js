import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.scss";

import NavBar from "./components/NavBar";
import Body from "./components/Body";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Body />
      </Router>
    </div>
  );
}

export default App;
