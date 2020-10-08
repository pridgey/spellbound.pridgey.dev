import React, { lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Layout } from "./../../components";

const Screenloader = lazy(() => import("../../components/screenloader"));
const Home = lazy(() => import("../../views/authenticated/home"));
const Campaign = lazy(() => import("../../views/authenticated/campaign"));

const AuthenticatedRoutes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/test/" component={Screenloader} />
        <Route path="/campaign" component={Campaign} />
        <Route path="/" component={Home} />
        <Redirect to="/" />
      </Switch>
    </Layout>
  );
};

export default AuthenticatedRoutes;
