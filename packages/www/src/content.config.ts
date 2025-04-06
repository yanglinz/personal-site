import { z, defineCollection } from "astro:content";
import { glob } from 'astro/loaders';

const postsCollection = defineCollection({
  loader: glob({ base: "./src/content/posts", pattern: "**/*.mdoc" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    date: z.string(),
    published: z.boolean(),
    featuredImage: z.boolean(),
  }),
});

const tilCollection = defineCollection({
  loader: glob({ base: "./src/content/til", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
  }),
});

export const collections = {
  posts: postsCollection,
  til: tilCollection
};
