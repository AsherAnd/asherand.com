import { createBrowserRouter } from "react-router";
import App from "./App.jsx";
import Blog from "./containers/Blog.jsx";
import NotFound from "./components/NotFound.jsx";

export const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/blog", element: <Blog /> },
  { path: "*", element: <NotFound /> },
]);
