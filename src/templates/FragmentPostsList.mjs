import * as React from "react";

function Posts() {}

function FragmentPostList(props) {
  const [posts] = props.args;
  console.log(posts);
  return (
    <div>
      <h1>PostList</h1>
    </div>
  );
}

export default FragmentPostList;
