import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./assets/fonts/FuriousStyles/FuriousSyles.css";
import "./assets/fonts/ProductSans/ProductSans.css";
import "./styles/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
