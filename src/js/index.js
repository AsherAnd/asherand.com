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

// when the theme button is clicked
toggleBtn.addEventListener("click", () => {
  changeTheme();
});

// keep navbar on top when scrolling
function stickyNavbar() {
  header.classList.toggle("scrolled", window.pageYOffset > 0);
}

function changeTheme() {
  if (document.body.classList.contains("light")) {
    document.querySelector("body").classList = "dark";
    toggleBtn.classList.replace("fa-moon", "fa-sun");
  } else {
    document.querySelector("body").classList = "light";
    toggleBtn.classList.replace("fa-sun", "fa-moon");
  }
}

scrollReveal.reveal(".showcase-image", { origin: "top", delay: 250 });
scrollReveal.reveal(".showcase-info");

stickyNavbar();
