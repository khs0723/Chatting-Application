const authSocket = require("./middleware/authSocket");
const newConnectionHandler = require("./socketHandlers/newConnectionHandler");
const disconnectionHandler = require("./socketHandlers/disconnectionHandler");

const registerSocketServer = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "Post"],
    },
  });

  io.use((socket, next) => {
    authSocket(socket, next);
  });

  io.on("connection", (socket) => {
    console.log("user connected");
    console.log(socket.id);

    // new connection handler
    newConnectionHandler(socket, io);

    socket.on("disconnect", () => {
      disconnectionHandler(socket);
    });
  });
};

module.exports = {
  registerSocketServer,
};
