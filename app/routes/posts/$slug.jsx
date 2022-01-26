import { useLoaderData } from "remix";
import { getPost } from "~/post";
import invariant from "tiny-invariant";

// params.slug 통해 파라미터의 url 접근
export const loader = async ({ params }) => {
  invariant(params.slug, "expected params.slug");
  return getPost(params.slug);
};

export default function PostSlug() {
  const post = useLoaderData();
  return <div dangerouslySetInnerHTML={{ __html: post.html }} />;
}
