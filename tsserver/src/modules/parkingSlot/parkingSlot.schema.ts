import {z} from 'zod';

export const parkingSlotSchema = z.object({
    pricePerHour : z.string({
        required_error: 'Price per hour is required',
    })
});
export const parkingSlotId = z.object({
    parkingSlotId : z.string({
        required_error: 'Parking slot id is required',
    })
})
export type ParkingSlotInput = z.infer<typeof parkingSlotSchema>;
export type ParkingSlotIdInput = z.infer<typeof parkingSlotId>;