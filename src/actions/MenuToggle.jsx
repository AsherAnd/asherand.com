import { useEffect, useState } from "react";

function MenuToggle() {
  //button state
  const [state, setState] = useState("closed");

  useEffect(() => {
    if (state === "open") {
      document.querySelector("body").classList.add("open");
      document.querySelector("body").classList.remove("closed");
    } else {
      document.querySelector("body").classList.add("closed");
      document.querySelector("body").classList.remove("open");
    }
  }, [state]);

  const toggleMenu = () => {
    if (state === "closed") {
      setState("open");
    } else if (state === "open") {
      setState("closed");
    }
  };

  return { state, toggleMenu };
}

export default MenuToggle;
