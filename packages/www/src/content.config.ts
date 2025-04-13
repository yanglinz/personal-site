import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const postsCollection = defineCollection({
  loader: glob({ base: "./src/content/posts", pattern: "**/*.mdoc" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    published: z.boolean(),
    featuredImage: z.string().optional(),
    featuredImageAlt: z.string().optional(),
    featuredImageAuthor: z.string().optional(),
    featuredImageUrl: z.string().optional(),
    featuredImageSource: z.string().optional(),
  }),
});

const tilCollection = defineCollection({
  loader: glob({ base: "./src/content/til", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
  }),
});

export const collections = {
  posts: postsCollection,
  til: tilCollection,
};
