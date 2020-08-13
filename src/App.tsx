import React from "react";
import faunadb, { query as q } from "faunadb";

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
      <header className="App-header"></header>
    </div>
  );
}

export default App;
