import { z } from "zod";

export const getCustomersSchema = z.object({
    page: z.number({
        required_error: "Page is required",
    }),
    limit: z.number({
        required_error: "Limit is required",
    }),
})

export type GetCustomersInput = z.infer<typeof getCustomersSchema>;