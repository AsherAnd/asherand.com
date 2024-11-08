import "../styles/components/Sectiontitle.css";
export default function SectionTitle(props) {
  gsap.registerPlugin(useGSAP, ScrollTrigger);

  useGSAP(() => {
    gsap.set(".section-title", {
      clipPath: "polygon(0 0, 5% 0, 5% 100%, 0 100%)",
    });

    // swipe reveal animation
    gsap.to(".section-title", {
      scrollTrigger: {
        trigger: ".section-title",
        start: "top 80%",
        toggleActions: "restart none none reverse",
        markers: true,
      },
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    });
  });
  return <div className="section-title">{props.title}</div>;
}
