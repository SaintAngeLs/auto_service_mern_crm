import React from "react";
import MechanicNav from "./MechanicNav";
import MechanicHome from "./MechanicHome";
import { Switch, Route } from "react-router-dom";
import FindOrders from "./FindOrders";
import MyOrders from "./MyOrders";

function mechanic() {
  return (
    <div>
      <MechanicNav />
      <MechanicHome />
      <Switch>
        <Route path="/manager_home/findOrders" component={FindOrders} />
        <Route path="/manager_home/myorders" component={MyOrders} />
      </Switch>
    </div>
  );
}

export default mechanic;
