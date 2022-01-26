import { Outlet, Link, useLoaderData } from "remix";
import { getPosts } from "~/post";
import adminStyles from "~/styles/admin.css";

export const loader = () => {
  return getPosts();
};
// 이렇게 하면 Remix가 렌더링된 모든 경로 링크를 병합하여 문서 상단의 <Links/> 요소에 렌더링할 수 있습니다.
export const links = () => {
  return [{ rel: "stylesheet", href: adminStyles }];
};

export default function Admin() {
  const posts = useLoaderData();
  return (
    <>
      <div className="admin">
        <nav>
          <h1>Admin</h1>
          <ul>
            {posts.map((post) => (
              <li key={post.slug}>
                <Link to={`/posts/${post.slug}`}>{post.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
