import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";

const io = new Server(8000, {
    cors: {
        origin: ["https://admin.socket.io", "http://localhost:5173"],
        credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log(`Connected: ${socket.id}`);

    socket.on("send-message", (message, room) => {
        socket.to(room).emit("receive-message", message);
    });

    socket.on("join-room", (room, callback) => {
        socket.join(room);
        callback(`Joined ${room}`);
    });

    socket.on("leave-room", (room, callback) => {
        socket.leave(room);
        callback(`Left ${room}`);
    });

    socket.on("disconnect", () => {
        console.log(`Disconnected: ${socket.id}`);
    });
});

instrument(io, {
    auth: false,
});