import React from "react";
import logo from "./logo.svg";
import "./App.css";
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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
