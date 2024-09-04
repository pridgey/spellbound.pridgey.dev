/* @refresh reload */
import { render } from "solid-js/web";
import { lazy } from "solid-js";
import { Route, Router } from "@solidjs/router";
import "./index.css";

const Home = lazy(() => import("./pages/home"));
const Table = lazy(() => import("./pages/table"));
const GM = lazy(() => import("./pages/gm"));

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

render(
  () => (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/table" component={Table} />
      <Route path="/table/:id" component={Table} />
      <Route path="/gm" component={GM} />
      <Route path="/gm/:id" component={GM} />
    </Router>
  ),
  root!
);
