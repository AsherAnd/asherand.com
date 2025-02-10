import { createBrowserRouter } from "react-router";
import App from "./App.jsx";
import Blog from "./containers/Blog.jsx";
import NotFound from "./components/NotFound.jsx";
import ErrorPage from "./components/ErrorPage.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/blog",
    element: <Blog />,
    errorElement: <ErrorPage />,
  },
  { path: "*", element: <NotFound /> },
]);
