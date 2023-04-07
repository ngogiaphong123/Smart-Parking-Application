import {z} from 'zod';

export const registerVehicleSchema = z.object({
    genre : z.string({
        required_error: 'Genre is required',
    }),
    model : z.string({
        required_error: 'Model is required',
    }),
    numberPlate : z.string({
        required_error: 'Number plate is required',
    })
})

export type RegisterVehicleInput = z.infer<typeof registerVehicleSchema>;