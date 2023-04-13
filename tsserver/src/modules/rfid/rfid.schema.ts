import {z} from 'zod';
export const rfidListSchema = z.object({
    list: z.array(z.string())
});

export type rfidListInput = z.infer<typeof rfidListSchema>;
