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
  },

  {
    title: "How is Sapper different from Next.js?",
    slug: "how-is-sapper-different-from-next",
    html: `Hello world!`
  },

  {
    title: "How can I get involved?",
    slug: "how-can-i-get-involved",
    html: `Hello world!`
  }
];

const postsBySlug = {};
posts.forEach(p => {
  postsBySlug[p.slug] = p;
});

// const lookup = new Map();
// posts.forEach((post) => {
//   lookup.set(post.slug, JSON.stringify(post));
// });

export function getManifest() {
  return posts;
}

export function hasPost(slug) {
  return Boolean(postsBySlug[slug]);
}

export function getPost(slug) {
  return postsBySlug[slug];
}
