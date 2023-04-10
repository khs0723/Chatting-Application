const jwt = require("jsonwebtoken");

const config = process.env;

const verifyTokenSocket = (socket, next) => {
  const token = socket.handshake.auth?.token;
  //console.log(token);
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    socket.user = decoded;
  } catch (error) {
    console.log(error);
    const socketError = new Error("Not authorized");
    return next(socketError);
  }

  next();
};

module.exports = verifyTokenSocket;
