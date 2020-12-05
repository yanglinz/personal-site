import React from "react";

export function ContentScope(props) {
  const childProps = { postId: props.postId };
  return React.Children.map(props.children, (c) =>
    React.cloneElement(c, childProps)
  );
}

export function ContentHTML(props) {
  return (
    <div>
      <h1>MarkdownHTML</h1>
    </div>
  );
}
