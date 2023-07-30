import Main from "./containers/Main";
import Theme from "./actions/Theme";
import MenuToggle from "./actions/MenuToggle";
import RouteLayout from "./components/RouteLayout";
import NotFound from "./components/NotFound";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

function App() {
  // website theme
  const { theme, changeTheme } = Theme();

  // hamburger menu
  const { _, toggleMenu } = MenuToggle();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <RouteLayout
            theme={theme}
            changeTheme={changeTheme}
            toggleMenu={toggleMenu}
          />
        }
        errorElement={<NotFound />}
      >
        <Route index element={<Main theme={theme} />} />
      </Route>
    )
  );

  return (
    <div className="App">
      <div className="overlay" onClick={toggleMenu}></div>
      <div className="grain"></div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
