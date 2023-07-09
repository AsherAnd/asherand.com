import Header from "./components/Header";
import Main from "./containers/Main";
import Theme from "./actions/Theme";
import MenuToggle from "./actions/MenuToggle";

function App() {
  // website theme
  const { theme, changeTheme } = Theme();

  // hamburger menu
  const { _, toggleMenu } = MenuToggle();

  return (
    <div className="App">
      <div className="overlay" onClick={toggleMenu}></div>
      <Header theme={theme} changeTheme={changeTheme} toggleMenu={toggleMenu} />
      <Main theme={theme} />
    </div>
  );
}

export default App;
