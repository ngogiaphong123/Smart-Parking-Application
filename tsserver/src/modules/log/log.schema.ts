
import { z } from "zod";
export const PageLimitSchema = {
    page: z.number({
        required_error: "Page is required",
    }),
    limit: z.number({
        required_error: "Limit is required",
    })
}
export const GetLogsSchema = z.object({
    ...PageLimitSchema
})
export const GetLogsByDateSchema = z.object({
    start : z.string({
        // regex : 2023-04-26T11:50:00.126Z
        required_error : "To date is required"
    }).regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/),
    end : z.string({
        // regex
        required_error : "From date is required"
    }).regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/),
    ...PageLimitSchema
})
export const getLogsByVehicleSchema = z.object({
    vehicleId : z.string({
        required_error : "Vehicle id is required"
    }),
    ...PageLimitSchema
})
export type GetLogsInput = z.infer<typeof GetLogsSchema>;
export type GetLogsByDateInput = z.infer<typeof GetLogsByDateSchema>;
export type GetLogsByVehicleInput = z.infer<typeof getLogsByVehicleSchema>;