import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const insights = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/insights' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().optional(),
    readTime: z.string().optional(),
    translationKey: z.string().optional(),
    lang: z.enum(['fr', 'en'])
  })
});

export const collections = {
  insights
};
