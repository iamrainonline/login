import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Navbar from "./Navbar";
import AuthContext from "../context/AuthContext";
import Dashboard from "./Dashboard";

const Home = () => {
  const { loggedIn } = useContext(AuthContext);

  const [cooki, setCooki] = useState(false);
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <div className="main-app">
              <div className="hero">
                <div className="text">WELCOME</div>
                <h5>
                  <span>Register</span> to continue ...
                </h5>
              </div>
              {cooki === false && (
                <div className="cookie">
                  <h2>We value your privacy</h2>
                  <p>
                    We and our partners are using technologies like Cookies or
                    Targeting and process personal data like IP-address or
                    browser information in order to personalize the
                    advertisement you see. This helps us to show you more
                    relevant ads and improves your internet experience.
                  </p>
                  <a onClick={() => setCooki(true)} href="#">
                    Accept and Continue
                  </a>
                </div>
              )}
            </div>
          </Route>
          {loggedIn === false && (
            <>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
            </>
          )}
          {loggedIn === true && (
            <>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
            </>
          )}
        </Switch>
      </div>
    </Router>
  );
};

export default Home;
