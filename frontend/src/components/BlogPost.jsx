import { useLoaderData, useParams, useNavigate } from "react-router";
import "../styles/components/blogpost.css";

export async function getBlogPost({ params }) {
  const { slug } = params;
  const APIUrl = import.meta.env.VITE_API_URL;
  const APIKey = import.meta.env.VITE_API_KEY;

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
  const goBack = () => {
    navigate(-1);
  };

  if (post === undefined || post.length === 0) {
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
              <h2>{blog.date}</h2>
            </span>
          )}
        </div>
        <div className="post-content">
          {post.description && (
            <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
          )}
        </div>
      </div>
    </div>
  );
}
