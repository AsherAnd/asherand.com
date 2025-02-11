import { createBrowserRouter } from "react-router";
import App from "./App.jsx";
import Blog from "./containers/Blog.jsx";
import NotFound from "./components/NotFound.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import BlogPost, { getBlogPost } from "./components/BlogPost.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "blog",
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Blog />,
      },
      {
        path: ":id",
        element: <BlogPost />,
        loader: getBlogPost,
      },
    ],
  },
  { path: "*", element: <NotFound /> },
]);
