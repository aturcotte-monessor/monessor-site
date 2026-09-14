import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const insights = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/insights' }),
	schema: z.object({
		title: z.string(),
		excerpt: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		author: z.string().optional(),
		authorTitle: z.string().optional(),
		readTime: z.string().optional(),
		translationKey: z.string().optional(),
		lang: z.enum(['fr', 'en']),
		tags: z.array(z.string()).optional(),
		draft: z.boolean().default(false)
	})
});

export const collections = {
	insights
};
