import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/style.css";
import "./assets/fonts/FuriousStyles/FuriousSyles.css";
import "./assets/fonts/ProductSans/ProductSans.css";
import App from "./App";
import Footer from "./Footer";

const root = ReactDOM.createRoot(document.getElementById("root"));
const foot = ReactDOM.createRoot(document.getElementById("foot"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

foot.render(
  <React.StrictMode>
    <Footer />
  </React.StrictMode>
);
