import {z} from 'zod';

export const parkingSlotSchema = z.object({
    status : z.string({
        required_error: 'Slot state is required',
    }),
    pricePerHour : z.string({
        required_error: 'Price per hour is required',
    })
});

export type ParkingSlotInput = z.infer<typeof parkingSlotSchema>;