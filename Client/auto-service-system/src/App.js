import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home";
import Customer from "./components/Customer/Customer";
import Admin from "./components/Member/Admin/Admin";
import Manager from "./components/Member/Memeber/Member";
import Login from "./components/Home/Login";

function App() {
  return (
    <Router>
      <Home />
      <Switch>
        {/* <Route exact path="/" component={Home} /> */}
        <Route path="/cust_home" component={Customer} />
        <Route path="/admin_home" component={Admin} />
        <Route path="/manager_home" component={Manager} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
