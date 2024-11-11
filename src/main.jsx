// src/main.jsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import Notification from "./components/Notification";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Notification />
    <App />
  </React.StrictMode>
);
