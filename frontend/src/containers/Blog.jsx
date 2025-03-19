import { useEffect, useState } from "react";
import ComicButton from "../components/ComicButton.jsx";
import Footer from "../components/Footer.jsx";
import BlogPostCard from "../components/BlogPostCard.jsx";
import "../styles/blog.css";

export default function Blog() {
  const [posts, setPosts] = useState(null);

  const fetchPosts = async () => {
    fetch(`${import.meta.env.VITE_API_URL}/projects`)
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

  useEffect(() => {
    fetchPosts();
  }, []);

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
            {posts?.map((project) => {
              return (
                <BlogPostCard
                  title={project.title}
                  image={project.thumbnail}
                  key={project.id}
                />
              );
            })}
            <BlogPostCard />
            <BlogPostCard />
            <BlogPostCard />
            <BlogPostCard />
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
