import { z } from "zod";

export const DateSchema = z.object({
    start : z.string({
        // regex : 2023-04-26T11:50:00.126Z
        required_error : "To date is required"
    }).regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/),
    end : z.string({
        // regex
        required_error : "From date is required"
    }).regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/),
})
export const DaySchema = z.object({
    day : z.string({
        // regex : 2023-04-26
        required_error : "Day is required"
    }).regex(/^\d{4}-\d{2}-\d{2}$/),
})
export type DateInput = z.infer<typeof DateSchema>;
export type DayInput = z.infer<typeof DaySchema>;