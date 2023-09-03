import { useEffect, useState } from "react";

function Footer() {
  const [footSentence, setFooter] = useState({
    text: "Code",
    link: "https://github.com/asherand",
  });

  useEffect(() => {
    fetchFooter();
  }, []);

  const fetchFooter = async () => {
    fetch(`${process.env.REACT_APP_API_URL}/footers`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setFooter(data[Math.floor(Math.random() * data.length)]);
      });
  };
  return (
    <h3 className="footer-text">
      <span className="footer-made">Made with</span>{" "}
      <a
        className="footer-sentence highlight"
        href={footSentence.link}
        target="_blank"
        rel="noreferrer"
      >
        {footSentence.text}
      </a>
    </h3>
  );
}

export default Footer;
