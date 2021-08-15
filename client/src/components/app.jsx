import React, { useState, useEffect } from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import "../styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "../services/auth.service";
import Login from "./login";
import Register from "./register";
import Home from "./home";
import Profile from "./profile";
import Dashboard from "./dashboard";
import AddCars from "./addCars";
import EventBus from "../common/EventBus";
import PrivateRoute from "../common/PrivateRoute";
import { history } from "../common/history";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <Router history={history}>
    <div className="appContainer">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Inventory Management
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {currentUser && (<>
            <li className="nav-item">
              <Link to={"/dashboard"} className="nav-link">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
            <Link to={"/addCars"} className="nav-link">
              Purchase
            </Link>
          </li></>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.message.name}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                Logout
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/addCars" component={AddCars} />
          <PrivateRoute path="/dashboard" component={() => <Dashboard headerTitle={"Cars Inventory"} showColumn={true} refreshInventory={true}/>} />
        </Switch>
      </div>
    </div>
    </Router>
  );
};

export default App;
