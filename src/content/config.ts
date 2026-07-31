import { defineCollection, z } from "astro:content";

const blog = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.coerce.date(),
        /* Lower-case, single words where possible — they are rendered as
           chips and long labels wreck the row rhythm. */
        tags: z.array(z.string()).default([]),
        draft: z.boolean().optional(),
    }),
});

export const collections = { blog };
