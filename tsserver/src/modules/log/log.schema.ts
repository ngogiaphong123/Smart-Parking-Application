import { z } from "zod";

export const GetLogsSchema = z.object({
    page: z.number({
        required_error: "Page is required",
    }),
    limit: z.number({
        required_error: "Limit is required",
    }),
})

export type GetLogsInput = z.infer<typeof GetLogsSchema>;