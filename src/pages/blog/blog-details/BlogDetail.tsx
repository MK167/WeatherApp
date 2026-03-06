import { useParams, useSearchParams } from "react-router";
import { getPostById } from "../../../data/post";

const BlogDetail = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const summary = searchParams.get("summary"); // Access the summary query parameter if needed
  const post = getPostById(Number(params.id) || 0); // Assume this function fetches the post data based on the ID
  return (
    <>
      <h2>{post?.title}</h2>
      <p>{post?.content}</p>
      {summary && <p><strong>Summary:</strong> {summary}</p>}
    </>
  );
};

export default BlogDetail;
