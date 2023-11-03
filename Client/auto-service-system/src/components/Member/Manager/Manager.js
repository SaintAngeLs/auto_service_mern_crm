import React from "react";

import { Switch, Route } from "react-router-dom";
import FindOrders from "./FindOrders";
import MyOrders from "./MyOrders";
import ManagerNav from "./ManagerNav";
import ManagerHome from "./ManagerHome";

function manager() {
  return (
    <div>

      <ManagerNav />
      
      <ManagerHome />

      <Switch>
        <Route path="/manager_home/findOrders" component={FindOrders} />
        <Route path="/manager_home/myorders" component={MyOrders} />
      </Switch>
    </div>
  );
}

export default manager;
