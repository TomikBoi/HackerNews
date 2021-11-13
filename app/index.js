import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./components/Nav";
import "./index.css";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Nav />
          <h1>Yo</h1>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
