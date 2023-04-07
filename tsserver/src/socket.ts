import { Server } from "socket.io";
import { getFanService, updateFanStatusToAdafruitService } from "./modules/device/fan/fan.service";
import { getTemperatureService } from "./modules/sensor/temperature/temperature.service";
import { getLightService } from "./modules/sensor/light/light.service";

export default function configureSocket(server: any) {
  const io = new Server(server, {
    cors: {
        origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("temperature-channel",async (data) => {
        const {page, limit} = data;
        const result = await getTemperatureService({page, limit});
        socket.emit("temperature-channel", result);
    })
    socket.on("light-channel",async (data) => {
        const {page, limit} = data;
        console.log(data)
        const result = await getLightService({page, limit});
        socket.emit("light-channel", result);
    })
    socket.on("fan-control", async (data) => {
        const {value} = data;
        const result = await updateFanStatusToAdafruitService(value);
        socket.emit("fan-control", result);
    });
    socket.on("fan-status", async (data) => {
        const {page, limit} = data;
        const result = await getFanService({page, limit});
        socket.emit("fan-status", result);
    })
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
  return io;
}