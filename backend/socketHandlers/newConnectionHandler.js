const serverStore = require("../serverStore");

const newConnectionHandler = async (socket, io) => {
  const userData = socket.user;

  serverStore.addNewConnectedUser({
    socketId: socket.id,
    userId: userData.userId,
  });
};

module.exports = newConnectionHandler;
