import { useEffect, useState } from "react";

function Theme() {
  const selectedTheme = localStorage.getItem("colorMode");
  const [theme, setTheme] = useState(
    selectedTheme === "light" ? "light" : "dark"
  );

  useEffect(() => {
    if (theme === "light") {
      document.querySelector("body").classList.add("light");
      document.querySelector("body").classList.remove("dark");
    } else {
      document.querySelector("body").classList.add("dark");
      document.querySelector("body").classList.remove("light");
    }
  }, [theme]);

  const changeTheme = () => {
    if (theme === "light") {
      localStorage.setItem("colorMode", "dark");
      setTheme("dark");
    } else if (theme === "dark") {
      localStorage.setItem("colorMode", "light");
      setTheme("light");
    }
  };

  return { theme, changeTheme };
}

export default Theme;
