import React from "react";
import { Link } from "gatsby";

import "./post-list.scss";

function Post(props) {
  const { fields, frontmatter } = props;

  return (
    <div className="Post">
      <h3 className="Post-title">
        <Link to={fields.slug}>{frontmatter.title}</Link>
      </h3>

      <p className="Post-date">
        <Link to={fields.slug}>
          <time>{frontmatter.date}</time>
        </Link>
      </p>
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
