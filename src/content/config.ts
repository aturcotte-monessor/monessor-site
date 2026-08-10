import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const insights = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/insights' }),
  schema: z.object({
    title: z.string().min(10),
    excerpt: z.string().max(160),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Alex Turcotte'),
    authorTitle: z.string().optional(), // On le rend optionnel dans le frontmatter
    readTime: z.string().optional(),
    translationKey: z.string().optional(),
    lang: z.enum(['fr', 'en']).default('fr'),
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }).optional(),
    draft: z.boolean().default(false),
  }).transform((data) => ({
    ...data,
    // Si authorTitle n'est pas saisi manuellement, on attribue la valeur localisée selon la langue
    authorTitle: data.authorTitle ?? (
      data.lang === 'en' 
        ? 'Managing Director & Fractional CTO' 
        : 'Directeur principal & CTO à temps partagé'
    ),
  }))
});

export const collections = {
  insights
};