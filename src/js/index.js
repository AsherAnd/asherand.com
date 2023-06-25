const header = document.querySelector("header");
const parallaxElem = document.querySelectorAll(".parallax");
const comicCover = document.getElementById("comic-cover");
let mouseX = 0,
  mouseY = 0;

window.addEventListener("scroll", stickyNavbar);

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

  console.log(mouseX, mouseY);
});

// keep navbar on top when scrolling
function stickyNavbar() {
  header.classList.toggle("scrolled", window.pageYOffset > 0);
}

stickyNavbar();
