const serverStore = require("../serverStore");

const disconnectionHandler = (socket) => {
  serverStore.removeConnectedUser(socket.id);
};

module.exports = disconnectionHandler;
