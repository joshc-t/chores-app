import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AddChore, EditChore } from "./pages/addChore/AddChore";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ShowChores from "./pages/showChores/ShowChores";

// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: "AIzaSyAVUbe_6Qt5FLXp5Q8leXi9OYAeVv0BoVU",
  authDomain: "chores-app-a1ca8.firebaseapp.com",
  projectId: "chores-app-a1ca8",
  storageBucket: "chores-app-a1ca8.appspot.com",
  messagingSenderId: "860916980116",
  appId: "1:860916980116:web:00a8cce2394f7269151781",
  databaseURL:
    "https://chores-app-a1ca8-default-rtdb.europe-west1.firebasedatabase.app",
};

initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShowChores />} />
        <Route path="/add" element={<AddChore />} />
        <Route path="/edit/:choreId" element={<EditChore />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
