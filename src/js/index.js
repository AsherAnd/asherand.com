const header = document.querySelector("header");
const links = document.querySelectorAll(".nav-link");
const toggleBtn = document.querySelector(".toggle-btn");
let mouseX = 0,
  mouseY = 0;

let scrollReveal = ScrollReveal({
  duration: 2500,
  distance: "60px",
});

let mixer = mixitup(".projects-gallery", {
  selectors: {
    target: ".project-card",
  },
  animation: {
    duration: 500,
  },
});

// when the site is scrolled
window.addEventListener("scroll", () => {
  stickyNavbar();
});

window
  .matchMedia("(prefers-color-scheme: light)")
  .addEventListener("change", () => {
    checkMode();
  });

// when the theme button is clicked
toggleBtn.addEventListener("click", () => {
  changeTheme();
});

// change website theme
function changeTheme() {
  if (document.body.classList.contains("light")) {
    localStorage.setItem("colorMode", "dark");
    setDarkMode();
  } else {
    localStorage.setItem("colorMode", "light");
    setLightMode();
  }
}

// Check to see if the system prefered theme is being used
function checkMode() {
  if (localStorage.getItem("colorMode") == null) {
    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      setMoon();
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setSun();
    }
  }
}

// set color mode from local storage
function setColorMode() {
  if (localStorage.getItem("colorMode") == "light") {
    setLightMode();
  } else if (localStorage.getItem("colorMode") == "dark") {
    setDarkMode();
  }
}

// set to dark
function setDarkMode() {
  document.querySelector("body").classList = "dark";
  setSun();
}

// set to light
function setLightMode() {
  document.querySelector("body").classList = "light";
  setMoon();
}

// set to moon icon
function setMoon() {
  toggleBtn.classList.replace("fa-sun", "fa-moon");
}

// set to sun icon
function setSun() {
  toggleBtn.classList.replace("fa-moon", "fa-sun");
}

// keep navbar on top when scrolling
function stickyNavbar() {
  header.classList.toggle("scrolled", window.pageYOffset > 0);
}

scrollReveal.reveal(".showcase-image", { origin: "top", delay: 250 });
scrollReveal.reveal(".showcase-info");

checkMode();
setColorMode();
stickyNavbar();
