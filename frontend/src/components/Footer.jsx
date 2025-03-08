import { useEffect, useState } from "react";

export default function Footer() {
  const [footerText, setFooterText] = useState({
    text: "Code",
    link: "https://github.com/asherand",
  });

  const fetchFooter = async () => {
    fetch(`${import.meta.env.VITE_API_URL}/footers`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setFooterText(data[Math.floor(Math.random() * data.length)]);
      });
  };

  useEffect(() => {
    fetchFooter();
  }, []);

  return (
    <footer>
      <h3 className="footer-text">
        <div>
          Made with{" "}
          <a
            className="link"
            href={footerText.link}
            target="_blank"
            rel="noreferrer"
          >
            {footerText.text}
          </a>
        </div>
      </h3>
    </footer>
  );
}
