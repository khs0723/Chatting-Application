import io from "socket.io-client";

let socket = null;

export const connectWithSocketServer = (userData) => {
  const jwtToken = userData.token;

  socket = io("http://localhost:5002", {
    auth: {
      token: jwtToken,
    },
  });

  socket.on("connect", () => {
    console.log("success connected with socket");
    console.log(socket.id);
  });
};
