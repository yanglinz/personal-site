import * as React from "react";

const datefns = require("date-fns");

function Post(props) {
  const { title, page } = props;
  return (
    <li className="border-gray-150 py-3 border-t md:flex md:items-center md:justify-between md:py-4 lg:py-6">
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
    <div className="lg:py-18 py-14 md:py-16">
      <div className="l-base">
        <div className="gap-4 grid-cols-6 md:grid">
          <div className="md:col-span-4 md:col-start-2">
            <div className="border-gray-150 py-6 border-t-8">
              <h2 className="pb-5 text-gray-500 text-xl font-bold lg:pb-7 lg:text-3xl">
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
      </div>
    </div>
  );
}

function FragmentPostsList(props) {
  const [posts] = props.args;
  return <PostsList posts={posts} />;
}

export default FragmentPostsList;
