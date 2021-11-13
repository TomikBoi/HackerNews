import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loading from "./components/Loading";
import Nav from "./components/Nav";
import Posts from "./components/Posts";
import { ThemeProvider } from "./contexts/theme";
import "./index.css";

class App extends React.Component {
  state = {
    theme: "light",
    toggleTheme: () => {
      this.setState(({ theme }) => ({
        theme: theme === "light" ? "dark" : "light",
      }));
    },
  };

  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className="container">
              <Nav />
              <React.Suspense fallback={<Loading />}>
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={(props) => <Posts {...props} postType={"top"} />}
                  />
                  <Route
                    exact
                    path="/new"
                    render={(props) => <Posts {...props} postType={"new"} />}
                  />
                  <Route render={() => <h1>404</h1>} />
                </Switch>
              </React.Suspense>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

/*

        <Posts postType={"top"} />
*/
