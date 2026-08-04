import { defineCollection, z } from "astro:content";

/**
 * Posts live under src/content/blog/<locale>/. The locale comes from that
 * directory rather than a frontmatter field, so the two can never disagree.
 */
const blog = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.coerce.date(),
        /* Lower-case, single words where possible, they render as chips and
           long labels wreck the row rhythm. */
        tags: z.array(z.string()).default([]),
        /* Shared across locales: how a translation finds its original, and
           how the language switcher links the two. */
        translationKey: z.string(),
        draft: z.boolean().optional(),
    }),
});

export const collections = { blog };
