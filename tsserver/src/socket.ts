import { Server } from "socket.io";
import { getTemperatureService } from "./modules/sensor/temperature/temperature.service";

export default function configureSocket(server: any) {
  const io = new Server(server, {
    cors: {
        origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });

  return io;
}