import { useLoaderData } from "react-router";

export async function getBlogPost({ params }) {
  const { id } = params;
  const res = await fetch(`https://api.asherand.com/api/projects/${id}`);

  if (!res.ok) {
    throw Error("There was an issue fetching your request");
  }

  return res.json();
}

export default function BlogPost() {
  const blog = useLoaderData()[0];

  if (blog === undefined || blog.length == 0) {
    throw Error("Blog doesn't exist");
  }

  return (
    <>
      <div id="blog">
        <div className="blog-title">{blog.title}</div>
      </div>
    </>
  );
}
