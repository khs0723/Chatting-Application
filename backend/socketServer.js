const authSocket = require("./middleware/authSocket");
const newConnectionHandler = require("./socketHandlers/newConnectionHandler");
const disconnectionHandler = require("./socketHandlers/disconnectionHandler");

const serverStore = require('./serverStore');

const registerSocketServer = (server) => {
    const io = require("socket.io")(server, {
        cors: {
            origin: "*",
            methods: ["GET", "Post"]
        }
    });

    serverStore.setSocketServerInstance(io)

    io.use((socket, next) => {
        authSocket(socket, next);
    });

    const emitOnlineUsers = () => {
        const onlineUsers = serverStore.getOnlineUsers()
        io.emit('online-users', {onlineUsers})
    };

    io.on("connection", (socket) => {
        console.log("user connected");
        console.log(socket.id);

        // new connection handler
        newConnectionHandler(socket, io);
        emitOnlineUsers();

        socket.on("disconnect", () => {
            disconnectionHandler(socket);
        });
    });

    setInterval(() => {
        emitOnlineUsers();
    }, [8000])
};

module.exports = {
    registerSocketServer
};
