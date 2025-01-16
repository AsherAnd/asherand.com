import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./router";
import "./assets/fonts/FuriousStyles/FuriousSyles.css";
import "./assets/fonts/ProductSans/ProductSans.css";
import "./styles/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="bg-image"></div>
    <div className="bg-gradient"></div>
    <RouterProvider router={router} />
  </StrictMode>
);
