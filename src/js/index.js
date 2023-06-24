const header = document.querySelector("header");

window.addEventListener("scroll", stickyNavbar);

// keep navbar on top when scrolling
function stickyNavbar() {
  header.classList.toggle("scrolled", window.pageYOffset > 0);
}

stickyNavbar();
