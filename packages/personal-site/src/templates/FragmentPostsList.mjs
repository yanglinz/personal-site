import * as React from "react";

const datefns = require("date-fns");

function Post(props) {
  const { title, page } = props;
  return (
    <li className="border-gray-150 border-b py-3 md:flex md:items-center md:justify-between md:py-4 lg:py-6">
      <h3 className="flex-1 pr-5">
        <a href={page.url} className="text-lg font-bold lg:text-3xl">
          {title}
        </a>
      </h3>

      <p className="flex-initial">
        <a
          href={page.url}
          className="text-gray-400 font-mono text-xs md:text-sm"
        >
          <time>{datefns.format(page.date, "MM/dd/yyyy")}</time>
        </a>
      </p>
    </li>
  );
}

function PostsList(props) {
  const { posts } = props;
  return (
    <div className="l-base">
      <div className="border-stone-150 border-t-8">
        <div className="py-14 lg:py-20">
          <h2 className="f-serif mb-2 text-stone-900 font-bold text-xl">
            Blog Posts
          </h2>

          <ul>
            {posts.map((p, i) => (
              <Post key={i} title={p.title} page={p.page} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function FragmentPostsList(props) {
  const [posts] = props.args;
  return <PostsList posts={posts} />;
}

export default FragmentPostsList;
