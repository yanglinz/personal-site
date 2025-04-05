import { z, defineCollection } from "astro:content";
import { glob } from 'astro/loaders';

const postsCollection = defineCollection({
  loader: glob({ pattern: "**/*.mdoc", base: "./src/content/posts" }),
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
  loader: glob({ pattern: "**/*.mdoc", base: "./src/content/til" }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
  }),
})

export const collections = {
  posts: postsCollection,
  til: tilCollection
};
