import { Link } from "react-router";
import posts from "../../data/post";

const index = () => {
  return (
    <div className="flex flex-row items-center justify-center mt-10 gap-4 flex-wrap">
      {posts.map((post) => (
        <div
          className="card w-100 bg-base-100 shadow-xl gap-2 mb-4"
          key={post.id}
        >
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <Link className="text-blue-500" to={`/blog/${post.id}?summary=${post.summary}`}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer text-primary-content hover:bg-primary-focus mt-2">
              Read More
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default index;
