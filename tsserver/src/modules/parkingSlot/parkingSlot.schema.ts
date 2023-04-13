import {z} from 'zod';

export const registerParkingSlotSchema = z.object({
    pricePerHour : z.string({
        required_error: 'Price per hour is required',
    })
});
export const parkingSlotIdSchema = z.object({
    //643366b06f0055e9b84d780b
    parkingSlotId : z.string({
        required_error: 'Parking slot id is required',
    }).min(24, {
        message: 'Parking slot id must be at least 24 characters',
    })
})
export type ParkingSlotInput = z.infer<typeof registerParkingSlotSchema>;
export type ParkingSlotIdInput = z.infer<typeof parkingSlotIdSchema>;