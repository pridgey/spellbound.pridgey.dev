import React, { lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const Screenloader = lazy(() => import("../../components/screenloader"));
const Home = lazy(() => import("../../views/authenticated/home"));

const AuthenticatedRoutes = () => {
  return (
    <Switch>
      <Route exact path="/test/" component={Screenloader} />
      <Route exact path="/" component={Home} />
      <Redirect to="/" />
    </Switch>
  );
};

export default AuthenticatedRoutes;
