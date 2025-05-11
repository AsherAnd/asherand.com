import { useEffect, useState } from "react";
import { useLoaderData, useParams, useNavigate } from "react-router";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "../styles/components/blogpost.css";

const APIUrl = import.meta.env.VITE_API_URL;
const APIKey = import.meta.env.VITE_API_KEY;

export async function getBlogPost({ params }) {
  const { slug } = params;

  const res = await fetch(`${APIUrl}/blog/${slug}`, {
    method: "GET",
    headers: {
      "X-API-Key": APIKey,
    },
  });

  if (!res.ok) {
    throw Error("There was an issue fetching your request");
  }

  return res.json();
}

export default function BlogPost() {
  const post = useLoaderData();
  const navigate = useNavigate();
  const [markdown, setMarkdown] = useState("");

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (post?.content) {
      fetch(`${APIUrl}${post.content}`, {
        headers: {
          "X-API-Key": APIKey,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch markdown content");
          return res.text();
        })
        .then(setMarkdown)
        .catch((err) => {
          console.error("Error loading markdown:", err);
          setMarkdown("# Error loading content");
        });
    }
  }, [post]);

  if (!post) {
    throw Error("Blog post doesn't exist");
  }

  return (
    <div className="post-container">
      <div id="blog-post">
        <i className="fa-solid fa-arrow-left back-btn" onClick={goBack}></i>
        <div className="post-title">
          <h1>{post.title}</h1>
        </div>
        <div className="post-content">
          <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {markdown}
          </Markdown>
        </div>
      </div>
    </div>
  );
}
