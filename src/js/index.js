const header = document.querySelector("header");
const links = document.querySelectorAll(".nav-link");
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

window.addEventListener("scroll", () => {
  stickyNavbar();
});

// keep navbar on top when scrolling
function stickyNavbar() {
  header.classList.toggle("scrolled", window.pageYOffset > 0);
}

scrollReveal.reveal(".showcase-image", { origin: "top", delay: 250 });
scrollReveal.reveal(".showcase-info");

stickyNavbar();
