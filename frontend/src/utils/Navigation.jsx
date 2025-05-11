export const scrollTo = (id) => {
  const section = document.getElementById(id);

  if (section) {
    window.scrollTo({
      top: section.offsetTop - window.innerHeight / 8, // Offset from the top (adjust as needed)
      behavior: "smooth",
    });
  }
};
