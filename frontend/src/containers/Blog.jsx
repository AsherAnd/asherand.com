import { useEffect, useState } from "react";
import ComicButton from "../components/ComicButton.jsx";
import Footer from "../components/Footer.jsx";
import BlogPostCard from "../components/BlogPostCard.jsx";
import "../styles/blog.css";

export default function Blog() {
  const [posts, setPosts] = useState(null);
  const [images, setImages] = useState({});

  const APIUrl = import.meta.env.VITE_API_URL;
  const APIKey = import.meta.env.VITE_API_KEY;

  const fetchPosts = async () => {
    fetch(`${APIUrl}/blog`, {
      method: "GET",
      headers: {
        "X-API-Key": APIKey,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchImage = async (id, path) => {
    try {
      const res = await fetch(`${APIUrl}${path}`, {
        headers: {
          "X-API-Key": APIKey,
        },
      });

      if (!res.ok) throw new Error("Image fetch failed");

      const blob = await res.blob();
      const imageUrl = URL.createObjectURL(blob);

      setImages((prev) => ({ ...prev, [id]: imageUrl }));
    } catch (err) {
      console.error("Failed to fetch image for", id, err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (posts) {
      posts.forEach((post) => {
        fetchImage(post.id, post.blog_image);
      });
    }
  }, [posts]);

  return (
    <>
      <header className="blog-header">
        <h1>My Blog</h1>
        <span>Tech, Builds and Other Things</span>
      </header>
      <div id="blog">
        <div className="container">
          <div className="filters">
            <button className="filter-btn">All</button>
            <button className="filter-btn">3D</button>
            <button className="filter-btn">Art</button>
            <button className="filter-btn">Code</button>
            <button className="filter-btn">Misc.</button>
          </div>
          <div className="blog-layout">
            {posts?.map((post) => {
              return (
                <BlogPostCard
                  title={post.title}
                  image={images[post.id]}
                  key={post.id}
                />
              );
            })}
          </div>
          <div className="load-button">
            <ComicButton text="Load More" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
