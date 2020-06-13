const posts = [
  {
    title: "What is Sapper?",
    slug: "what-is-sapper",
    html: `Hello world!`
  },
  {
    title: "How to use Sapper",
    slug: "how-to-use-sapper",
    html: `Hello world!`
  },
  {
    title: "Why the name?",
    slug: "why-the-name",
    html: `Hello world!`
  }
];

const postsBySlug = {};
posts.forEach(p => {
  postsBySlug[p.slug] = p;
});

export function getManifest() {
  return posts;
}

export function hasPost(slug) {
  return Boolean(postsBySlug[slug]);
}

export function getPost(slug) {
  return postsBySlug[slug];
}
