import {z} from 'zod';
export const sensorRequestQuerySchema = z.object({
    page : z.string({
        required_error: 'Page is required',
    }),
    limit : z.string({
        required_error: 'Limit is required',
    })
});

export type SensorRequestQueryInput = z.infer<typeof sensorRequestQuerySchema>;