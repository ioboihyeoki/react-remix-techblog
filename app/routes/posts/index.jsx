import { Link, useLoaderData } from "remix";
import { getPosts } from "~/post";
// loader는 백엔드 API 역할을 한다.
export const loader = () => {
  return getPosts();
};

export default function Posts() {
  const posts = useLoaderData();
  return (
    <div>
      <h1>게시물 리스트</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
