import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";

const io = new Server(9000, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`Connected: ${socket.id}`);

  socket.on("send-message", (message, room) => {
    console.log(message, room);
    socket.to(room).emit("receive-message", message);
  });

  socket.on("join-room", (room) => {
    socket.join(room);
  });

  socket.on("exit-room", (room) => {
    socket.leave(room);
  });

  socket.on("disconnect", () => {
    console.log(`Disconnected: ${socket.id}`);
  });
});

instrument(io, {
  auth: false,
});