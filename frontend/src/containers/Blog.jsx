import Navbar from "../components/Navbar.jsx";
import Footer from "../components/footer.jsx";
import BlogPost from "../components/BlogPost.jsx";
import "../styles/blog.css";

export default function Blog() {
  return (
    <>
      <div id="blog" style={{ minHeight: "100vh" }}>
        <div className="container">
          <h1>Blog</h1>
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
