import * as React from "react";

function Post(props) {
  const { title, url, formattedDate } = props;

  return (
    <li class="border-gray-150 py-3 border-t md:flex md:items-center md:justify-between md:py-4 lg:py-6">
      <h3 class="flex-1 pr-5">
        <a href={url} class="text-lg font-bold lg:text-3xl">
          {title}
        </a>
      </h3>

      <p class="flex-initial">
        <a
          href="{{ post.url }}"
          class="text-gray-400 font-mono text-xs md:text-sm"
        >
          <time>{formattedDate}</time>
        </a>
      </p>
    </li>
  );
}

function FragmentPostList(props) {
  const { posts } = props;
  return (
    <>
      <div class="lg:py-18 py-14 md:py-16">
        <div class="l-base">
          <div class="gap-4 grid-cols-6 md:grid">
            <div class="md:col-span-4 md:col-start-2">
              <div class="border-gray-150 py-6 border-t-8">
                <h2 class="pb-5 text-gray-500 text-xl font-bold lg:pb-7 lg:text-3xl">
                  Blog Posts
                </h2>

                <ul>
                  {props.map((p) => (
                    <Post title={p.title} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FragmentPostList;
