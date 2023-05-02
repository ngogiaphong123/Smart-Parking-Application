import { z } from "zod";

export const StartDateSchema = z.object({
    start : z.string({
        // regex : 2023-04-26T11:50:00.126Z
        required_error : "To date is required"
    }).regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/),
    accountId : z.string({}).optional()
})
export const logVehicleSchema = z.object({
    start : z.string({
        // regex : 2023-04-26T11:50:00.126Z
        required_error : "To date is required"
    }).regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/),
    accountId : z.string({
        required_error : "Account id is required"
    })
})
export type StartDateInput = z.infer<typeof StartDateSchema>;
export type LogVehicleInput = z.infer<typeof logVehicleSchema>;