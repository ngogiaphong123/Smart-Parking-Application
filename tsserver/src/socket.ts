import { Server } from "socket.io";

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