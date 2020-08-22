import React, { lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const Home = lazy(() => import("../../views/unauthenticated/home"));

const UnauthenticatedRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Redirect to="/" />
    </Switch>
  );
};

export default UnauthenticatedRoutes;
