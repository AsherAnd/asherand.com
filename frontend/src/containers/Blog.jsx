import { useEffect, useState } from "react";
import ComicButton from "../components/ComicButton.jsx";
import Footer from "../components/Footer.jsx";
import BlogPostCard from "../components/BlogPostCard.jsx";
import "../styles/blog.css";

export default function Blog() {
  const [posts, setPosts] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const limit = 5;

  const APIUrl = import.meta.env.VITE_API_URL;
  const APIKey = import.meta.env.VITE_API_KEY;

  const categories = ["All", "3D", "Art", "Code", "Misc."];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setOffset(0);
    setPosts([]);
    setHasMore(true);
    fetchPosts(0, category, true);
  };

  const fetchPosts = async (
    offsetValue = 0,
    category = selectedCategory,
    replace = false
  ) => {
    const categoryQuery =
      category !== "All" ? `&category=${encodeURIComponent(category)}` : "";
    const query = `?limit=${limit}&offset=${offsetValue}${categoryQuery}`;

    try {
      const res = await fetch(`${APIUrl}/blog${query}`, {
        headers: {
          "X-API-Key": APIKey,
        },
      });
      const data = await res.json();

      if (data.length < limit) {
        setHasMore(false);
      }

      setPosts((prev) => (replace ? data : [...prev, ...data]));
    } catch (error) {
      console.log("Failed to fetch posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts(0, "All", true);
  }, []);

  const handleLoadMore = () => {
    const newOffset = offset + limit;
    setOffset(newOffset);
    fetchPosts(newOffset);
  };

  return (
    <>
      <header className="blog-header">
        <h1>My Blog</h1>
        <span>Tech, Builds and Other Things</span>
      </header>
      <div id="blog">
        <div className="container">
          <div className="filters">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="blog-layout">
            {posts?.map((post) => {
              return (
                <BlogPostCard
                  title={post.title}
                  slug={post.slug}
                  date={post.publication_date}
                  image={APIUrl + post.blog_image}
                  category={post.categories}
                  subcategories={post.subcategories}
                  key={post.id}
                />
              );
            })}
          </div>
          {hasMore && (
            <div className="load-button">
              <ComicButton text="Load More" onClick={handleLoadMore} />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
