import { useLoaderData } from "remix";
import { Link } from "react-router-dom";

import stylesUrl from "../styles/index.css";

export function meta() {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!"
  };
}

export function links() {
  return [{ rel: "stylesheet", href: stylesUrl }];
}

export function loader() {
  return fetch("https://api.jokes.one/jod")
    .then((d) => d.json())
    .then((json) => json.contents)
    .then((contents) => contents.jokes[0])
    .then((joke) => joke.joke.text)
    .catch((e) => e.message);
}

export default function Index() {
  let data = useLoaderData();

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <h2>React-Remix를 이용한 블로그 예제</h2>
      <p>
        리믹스에 대해 더 알고 싶으세요?{" "}
        <a href="https://docs.remix.run">해당 문서를 참고하세요.</a>
      </p>
      <p>로더를 이용해 불러온 오늘의 joke: {data}</p>
      <p>
        <Link to="not-found">404 not found 페이지입니다.</Link> root안의
        CatchBoundary component가 처리해요.
      </p>
      <p>
        <Link to="/posts">게시물 보러 가기</Link>
      </p>
      <p>
        <Link to="/admin">게시물 업로드</Link>
      </p>
    </div>
  );
}
