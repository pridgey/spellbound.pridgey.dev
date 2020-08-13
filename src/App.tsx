import React, { Suspense } from "react";
import faunadb, { query as q } from "faunadb";
import { BrowserRouter } from "react-router-dom";
import { AuthenticatedRoutes } from "./utilities/routes";

function App() {
  var client = new faunadb.Client({
    secret: process.env.react_app_fauna_secret || "",
  });

  client
    .query(q.Get(q.Ref(q.Collection("gametable"), "273705832001045004")))
    .then((ret: any) => console.log(ret?.data?.test))
    .catch((issue) => console.log("uhoh", issue));

  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<div>Loading</div>}>
          <AuthenticatedRoutes />
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
