import Header from "./components/Header";
import Main from "./containers/Main";
import Theme from "./actions/Theme";

function App() {
  const { theme, changeTheme } = Theme();

  return (
    <div className="App">
      <Header theme={theme} changeTheme={changeTheme} />
      <Main theme={theme} />
    </div>
  );
}

export default App;
