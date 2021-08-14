import React from "react";
import Home from "./Home";
import Moviedetails from "./Moviedetails";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/moviedetails/:slug" component={Moviedetails} exact />
        </Switch>
      </div>
    </Router>
  );
}
export default App;
