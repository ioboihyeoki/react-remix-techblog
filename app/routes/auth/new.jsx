import { useTransition, useActionData, Form, redirect } from "remix";
import { createPost } from "~/post";
import invariant from "tiny-invariant";

export const action = async ({ request }) => {
  // pending UI를 사용하기 위해 추가함.
  await new Promise((res) => setTimeout(res, 1000));

  const formData = await request.formData();

  const title = formData.get("title");
  const slug = formData.get("slug");
  const markdown = formData.get("markdown");
  const errors = {};
  if (!title) errors.title = true;
  if (!slug) errors.slug = true;
  if (!markdown) errors.markdown = true;

  invariant(typeof title === "string");
  invariant(typeof slug === "string");
  invariant(typeof markdown === "string");
  // 리디렉션을 반환하지 않고 실제로 오류를 반환합니다.
  // 이러한 오류는 useActionData를 통해 컴포넌트에서 사용 가능합니다.
  // useLoaderData와 비슷하지만 POST 이후에 가져옵니다.
  if (Object.keys(errors).length) {
    return errors;
  }
  await createPost({ title, slug, markdown });

  return redirect("/auth");
};

export default function NewPost() {
  // form action 이후에 가져옴.
  const errors = useActionData();
  const transition = useTransition();
  return (
    <Form method="post">
      <p>
        <label>
          Post Title: {errors?.title ? <em>Title is required</em> : null}
          <input type="text" name="title" />
        </label>
      </p>
      <p>
        <label>
          Post Slug: {errors?.slug ? <em>Slug is required</em> : null}
          <input type="text" name="slug" />
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Markdown:</label>{" "}
        {errors?.markdown ? <em>Markdown is required</em> : null}
        <br />
        <textarea rows={20} name="markdown" />
      </p>
      <p>
        <button type="submit">
          {transition.submission ? "Creating..." : "Create Post"}
        </button>
      </p>
    </Form>
  );
}
