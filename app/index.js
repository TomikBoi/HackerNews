import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loading from "./components/Loading";
import Nav from "./components/Nav";
import Posts from "./components/Posts";
import "./index.css";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Nav />
          <React.Suspense fallback={<Loading />}>
            <Switch>
              <Route exact path="/" render={(props) => (<Posts {...props} postType={'top'}/>)} />
              <Route exact path="/new" render={(props) => (<Posts {...props} postType={'new'}/>)} />
              <Route render={() => <h1>404</h1>} />
            </Switch>
          </React.Suspense>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

/*

        <Posts postType={"top"} />
*/
