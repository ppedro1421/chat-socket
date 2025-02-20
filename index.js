import { Server } from "socket.io";

const io = new Server(9000, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`Connected: ${socket.id}`);

  socket.on("send-message", (message, room) => {
    socket.to(room).emit("receive-message", message);
  });

  socket.on("join-room", (room) => {
    socket.join(room);
  });

  socket.on("exit-room", (room) => {
    socket.leave(room);
  });

  socket.on("new-journey", (client, journeyId, driverId) => {
    socket.to(client).emit("journey-created", journeyId, driverId);
  });

  socket.on("end-journey", (client, journeyId) => {
    socket.to(client).emit("journey-finished", journeyId);
  });

  socket.on("disconnect", () => {
    console.log(`Disconnected: ${socket.id}`);
  });
});
