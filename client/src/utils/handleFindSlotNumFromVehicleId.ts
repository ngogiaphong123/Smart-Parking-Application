const handleFindSlotNumFromVehicleId = (vehicleId: string, parkingSlots: any): number => {
    let result: any = false
    if (parkingSlots && parkingSlots.length > 0) {
        parkingSlots.forEach((slot: any, index: number) => {
            if (slot.vehicle) {
                if (vehicleId === slot.vehicle.vehicleId) {
                    result = index.toString()
                }
            }
        })
    }
    return result
}

export default handleFindSlotNumFromVehicleId