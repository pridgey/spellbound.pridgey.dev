import React, { Suspense, lazy } from "react";
import faunadb, { query as q } from "faunadb";
import { BrowserRouter } from "react-router-dom";
import { Screenloader } from "./components/screenloader/screenloader";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { ThemeProvider } from "styled-components";
import { getTheme, AirtableProvider } from "./utilities";

firebase.initializeApp({
  apiKey: process.env.react_app_firebase_key,
  authDomain: "spellbound-4ead3.firebaseapp.com",
  databaseURL: "https://spellbound-4ead3.firebaseio.com",
  projectId: "spellbound-4ead3",
  storageBucket: "spellbound-4ead3.appspot.com",
  messagingSenderId: "895661737789",
  appId: "1:895661737789:web:67d5d19966a82e83796754",
  measurementId: "G-Z2NYH4N046",
});

const UnauthenticatedRoutes = lazy(
  () => import("./utilities/routes/unauthenticatedRoutes")
);
const AuthenticatedRoutes = lazy(
  () => import("./utilities/routes/authenticatedRoutes")
);

function App() {
  const [user] = useAuthState(firebase.auth());

  var client = new faunadb.Client({
    secret: process.env.react_app_fauna_secret || "",
  });

  client
    .query(q.Get(q.Collection("campaign")))
    .then((ret: any) => console.log(ret))
    .catch((issue) => console.log("uhoh", issue));

  return (
    <div className="App">
      <AirtableProvider>
        <ThemeProvider theme={getTheme()}>
          <BrowserRouter>
            <Suspense fallback={<Screenloader />}>
              {user?.uid ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />}
            </Suspense>
          </BrowserRouter>
        </ThemeProvider>
      </AirtableProvider>
    </div>
  );
}

export default App;
