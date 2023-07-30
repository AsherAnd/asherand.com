import { Outlet } from "react-router-dom";
import Header from "./Header";

function RouteLayout(props) {
  return (
    <>
      <Header
        theme={props.theme}
        changeTheme={props.changeTheme}
        toggleMenu={props.toggleMenu}
      />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RouteLayout;
