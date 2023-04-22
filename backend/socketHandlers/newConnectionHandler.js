const serverStore = require("../serverStore");
const friendsUpdate = require('../socketHandlers/updates/friends')
const roomsUpdate = require('./updates/rooms');

const newConnectionHandler = async (socket, io) => {
    const userData = socket.user;

    serverStore.addNewConnectedUser({socketId: socket.id, userId: userData.userId});

    // update pending friends invitation list
    friendsUpdate.updateFriendsPendingInvitations(userData.userId)

    // update friends list
    friendsUpdate.updateFriends(userData.userId)


    setTimeout(() => {
        roomsUpdate.updateRooms(socket.id);
    }, [500])
};

module.exports = newConnectionHandler;
