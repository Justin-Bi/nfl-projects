import React from "react";
import "./App.css";
import SixDegreesForm from "./components/SixDegreesForm";
// import Nav from './Nav';
// import Shop from './Shop';
// import About from './About';
// import ItemDetail from './ItemDetail'

function App() {
  return (
    <div className="App">
      <SixDegreesForm/>
      {/* <Nav />
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/shop" exact component={Shop}/>
          <Route path="/shop/:id" component={ItemDetail}/>
        </Switch> */}
    </div>
  );
}

export default App;
