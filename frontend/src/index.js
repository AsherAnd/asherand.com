import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/style.css";
import App from "./App";
import(
  /* webpackPreload: true */ "./assets/fonts/FuriousStyles/FuriousSyles.css"
);
import(/* webpackPreload: true */ "./assets/fonts/ProductSans/ProductSans.css");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
