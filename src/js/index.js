const header = document.querySelector("header");
const parallaxElem = document.querySelectorAll(".parallax");
const comicCover = document.getElementById("comic-cover");
let mouseX = 0,
  mouseY = 0;

let scrollReveal = ScrollReveal({
  duration: 2500,
  distance: "60px",
});

window.addEventListener("scroll", stickyNavbar);

// comic cover parallax effect
comicCover.addEventListener("mousemove", (e) => {
  let rect = comicCover.getBoundingClientRect();
  x = e.clientX - rect.left;
  y = e.clientY - rect.top;

  mouseX = x - comicCover.clientWidth / 2;
  mouseY = y - comicCover.clientHeight / 2;

  parallaxElem.forEach((element) => {
    let speedX = element.dataset.speedx;
    let speedY = element.dataset.speedy;

    element.style.transform = `translateX(${mouseX * speedX}px) translateY(${
      mouseY * speedY
    }px)`;
  });
});

// keep navbar on top when scrolling
function stickyNavbar() {
  header.classList.toggle("scrolled", window.pageYOffset > 0);
}

scrollReveal.reveal(".showcase-image", { origin: "top", delay: 250 });
scrollReveal.reveal(".showcase-info");

stickyNavbar();
