import {z} from 'zod';
export const rfidList = z.object({
    list: z.array(z.string())
});

export type rfidListInput = z.infer<typeof rfidList>;
