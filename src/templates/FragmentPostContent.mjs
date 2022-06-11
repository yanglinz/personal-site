import * as React from "react";

function Content(props) {
  const { url, title, formattedDate, content } = props;
  return (
    <main>
      <article>
        <div className="l-wide">
          <div className="pt-14 pb-10 lg:pt-20 lg:pb-8">
            <h1 className="m-0 text-center text-4xl font-bold leading-tight">
              <a href={url}>{title}</a>
            </h1>

            <p className="pt-4 text-center text-gray-400 font-mono text-sm">
              <time>{formattedDate}</time>
            </p>
          </div>
        </div>

        <div className="l-narrow">
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </div>
      </article>
    </main>
  );
}

function FragmentPostContent(props) {
  const [page, title, formattedDate, content] = props.args;

  return (
    <Content
      url={page.url}
      title={title}
      formattedDate={formattedDate}
      content={content}
    />
  );
}

export default FragmentPostContent;
