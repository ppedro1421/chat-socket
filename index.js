import { Server } from "socket.io";

const io = new Server({
    cors: {
        origin: "*",
    },
});

let USERS = [];

io.on("connection", (socket) => {
    socket.on("message", (message) => {
        let user = USERS.find((users) => users.id === socket.id);
        if (user) {
            let username = user.name;
            io.emit("message", { user: username, message });
        };
    });

    socket.on("new-user", (user) => {
        if (USERS.some((users) => users.name === user)) {
            io.to(socket.id).emit("notification", "Usuario já logado.");
        }
        else {
            USERS.push({ name: user, id: socket.id });
            io.to(socket.id).emit("new-user", user);
        };
    });

    socket.on("disconnect", () => {
        USERS = USERS.filter((users) => users.id !== socket.id);
    });
});

io.listen(4000);