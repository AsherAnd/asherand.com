import Footer from "../components/footer.jsx";
import BlogPostCard from "../components/BlogPostCard.jsx";
import "../styles/blog.css";

export default function Blog() {
  return (
    <>
      <div id="blog">
        <header>
          <h1>Blog</h1>
        </header>
        <div className="container">
          <div className="filters">
            <button className="filter-btn">All</button>
            <button className="filter-btn">Code</button>
            <button className="filter-btn">Photoshop</button>
            <button className="filter-btn">Misc.</button>
          </div>
          <div className="blog-layout"></div>
        </div>
      </div>
      <Footer />
    </>
  );
}
