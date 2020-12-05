import React from "react";

export default function ContentScope(props) {
  const childProps = { postId: props.postId };
  return React.Children.map(props.children, (c) =>
    React.cloneElement(c, childProps)
  );
}
