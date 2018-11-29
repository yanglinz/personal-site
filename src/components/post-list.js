import React from "react";
import { Link } from "gatsby";

function Post(props) {
  const { fields, frontmatter } = props;

  return (
    <div className="Post">
      <h3 className="Post-title">
        <Link to={fields.slug}>{frontmatter.title}</Link>
      </h3>
    </div>
  );
}

function PostList(props) {
  const { posts } = props;
  return (
    <section className="PostList">
      <div className="l-wide">
        {posts && posts.map(p => <Post key={p.id} {...p} />)}
      </div>
    </section>
  );
}

export default PostList;
