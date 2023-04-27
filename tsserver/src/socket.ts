import { Server } from "socket.io";
import { getFanService, updateFanStatusToAdafruitService } from "./modules/device/fan/fan.service";
import { getTemperatureService, updateTemperatureToAdafruitService } from "./modules/sensor/temperature/temperature.service";
import { getLightService } from "./modules/sensor/light/light.service";
import { getParkingSlotService, reservedParkingSlotService } from "./modules/parkingSlot/parkingSlot.service";
import { updateRfidToAdafruitService } from "./modules/rfid/rfid.service";

export default function configureSocket(server: any) {
  const io = new Server(server, {
    cors: {
        origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");
    socket.emit("connected", "connected")
    socket.on("temperature-channel",async (data) => {
        const {page, limit} = data;
        const result = await getTemperatureService({page, limit});
        socket.emit("temperature-channel", result);
    })
    socket.on("temperature-control", async (data) => {
        const {value} = data;
        const result = await updateTemperatureToAdafruitService(value);
        socket.emit("temperature-control", result);
    });
    socket.on("light-channel",async (data) => {
        const {page, limit} = data;
        const result = await getLightService({page, limit});
        socket.emit("light-channel", result);
    })
    socket.on("fan-control", async (data) => {
        const {value} = data;
        const result = await updateFanStatusToAdafruitService(value);
        io.emit("fan-control", result);
    });
    socket.on("fan-status", async (data) => {
        const {page, limit} = data;
        const result = await getFanService({page, limit});
        socket.emit("fan-status", result);
    })
    socket.on("parking-slot-channel",async (data) => {
        const {page, limit} = data;
        const result = await getParkingSlotService({page, limit});
        socket.emit("parking-slot-channel", result);
    })
    socket.on("rfid-control", async (data) => {
        const {value} = data;
        const result = await updateRfidToAdafruitService(value);
        io.emit("rfid-control", result);
    })
    socket.on("parking-slot-reserved", async (data) => {
        const {parkingSlotId, accountId, vehicleId} = data;
        const result = await reservedParkingSlotService(parkingSlotId, accountId,vehicleId);
        socket.emit("parking-slot-reserved", result);
    })
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
  });
  return io;
}