import React, { lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const Screenloader = lazy(() => import("../../components/screenloader"));

const AuthenticatedRoutes = () => {
  return (
    <Switch>
      <Route exact path="/test/" component={Screenloader} />
      <Redirect to="/test" />
    </Switch>
  );
};

export default AuthenticatedRoutes;
