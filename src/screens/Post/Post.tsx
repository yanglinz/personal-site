type TODO = any;

export default function Post(props: TODO) {
  const { post } = props;
  // TODO: Featured image
  return (
    <main>
      <article className="BlogPost">
        <div className="l-wide">
          <div className="BlogPost-metadata">
            <h1 className="BlogPost-title">
              <a rel="prefetch" href="posts/{post.slug}">
                {post.title}
              </a>
            </h1>

            <time className="BlogPost-date">{post.date}</time>
          </div>
        </div>

        <div className="l-narrow">
          <div className="BlogPost-content">{props.children}</div>
        </div>
      </article>
    </main>
  );
}
