import { useEffect, useState } from "react";
import { useLoaderData, useParams, useNavigate } from "react-router";
import Markdown from "react-markdown";
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
  const [imageCache, setImageCache] = useState({});

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

  // Custom image component for react-markdown
  const ImageWithAuth = ({ src, alt }) => {
    const [blobUrl, setBlobUrl] = useState(null);

    useEffect(() => {
      const fetchImage = async () => {
        if (!src) return;

        if (imageCache[src]) {
          setBlobUrl(imageCache[src]);
          return;
        }

        try {
          const response = await fetch(`${APIUrl}${src}`);
          if (!response.ok) throw new Error(`Image fetch failed: ${src}`);
          const blob = await response.blob();
          const objectUrl = URL.createObjectURL(blob);
          setImageCache((prev) => ({ ...prev, [src]: objectUrl }));
          setBlobUrl(objectUrl);
        } catch (err) {
          console.error(err);
        }
      };

      fetchImage();
    }, [src]);

    return blobUrl ? (
      <img src={blobUrl} alt={alt} />
    ) : (
      <span>Loading image...</span>
    );
  };

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
        <div className="post-meta">
          {post.author && <span className="post-author">By {post.author}</span>}
          {post.date && (
            <span className="post-date">
              <h2>{post.date}</h2>
            </span>
          )}
        </div>
        <div className="post-content">
          <Markdown rehypePlugins={[rehypeRaw]} components={{}}>
            {markdown}
          </Markdown>
        </div>
      </div>
    </div>
  );
}
