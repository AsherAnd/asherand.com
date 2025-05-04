import { useEffect, useState } from "react";

export default function Footer() {
  const [footer, setFooter] = useState({
    text: "Code",
    link: "https://github.com/asherand",
  });

  const APIUrl = import.meta.env.VITE_API_URL;
  const APIKey = import.meta.env.VITE_API_KEY;

  const fetchFooter = async () => {
    fetch(`${APIUrl}/footer`, {
      method: "GET",
      headers: {
        "X-API-Key": APIKey,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setFooter(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchFooter();
  }, []);

  return (
    <footer>
      <h6 className="footer-text">
        <div>
          Made with{" "}
          <a
            className="link"
            href={footer.link}
            target="_blank"
            rel="noreferrer"
          >
            {footer.text}
          </a>
        </div>
      </h6>
    </footer>
  );
}
