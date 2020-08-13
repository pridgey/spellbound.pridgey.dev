import React, { lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const About = lazy(() => import("../../components/about"));
const Home = lazy(() => import("../../components/home"));

export const AuthenticatedRoutes = () => {
  return (
    <Switch>
      <Route exact path="/about" component={About} />
      <Route exact path="/" component={Home} />
      <Redirect to="/" />
    </Switch>
  );
};
