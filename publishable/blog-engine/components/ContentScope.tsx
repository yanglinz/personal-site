import React from "react";

type TODO = any;

export default function ContentScope(props: TODO) {
  const childProps = { postId: props.postId };
  return React.Children.map(props.children, (c) =>
    React.cloneElement(c, childProps)
  );
}
