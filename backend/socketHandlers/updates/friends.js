const User = require('../../models/User');
const FriendInvitation = require('../../models/FriendInvitation');
const serverStore = require('../../serverStore');

const updateFriendsPendingInvitations = async (userId) => {
  console.log(userId);
  try {
    const pendingInvitations = await FriendInvitation.find({ receiverId: userId }).populate(
      'senderId',
      '_id username email'
    );
    // find all active connections of specific userId
    const receiverList = serverStore.getActiveConnections(userId);

    const io = serverStore.getSocketServerInstance();

    receiverList.forEach((receiverSocketId) => {
      io.to(receiverSocketId).emit('friends-invitations', {
        pendingInvitations: pendingInvitations ? pendingInvitations : [],
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const updateFriends = async (userId) => {
  try {
    // find active connection of specific if (online user)
    const receiverList = serverStore.getActiveConnections(userId);

    if (receiverList.length > 0) {
      const user = await User.findById(userId, {
        _id: 1,
        friends: 1,
      }).populate('friends', '_id username email');

      if (user) {
        const friendsList = user.friends.map((f) => {
          return { id: f._id, username: f.username, email: f.email };
        });

        // get io instance
        const io = serverStore.getSocketServerInstance();

        receiverList.forEach((receiverSocketId) => {
          io.to(receiverSocketId).emit('friends-list', {
            friends: friendsList ? friendsList : [],
          });
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  updateFriendsPendingInvitations,
  updateFriends,
};
