const FriendInvitation = require("../models/FriendInvitation");
const User = require("../models/User");

const friendsUpdates = require('../socketHandlers/updates/friends')

const postInvite = async (req, res) => {
    const {targetEmail} = req.body;

    const {userId, email} = req.user;

    // check sender === receiver
    if (email.toLowerCase() === targetEmail.toLowerCase()) {
        return res.status(409).send('Sorry. You cannot become friend with yourself')
    }

    // check receiver exists
    const targetUser = await User.findOne({email: targetEmail.toLowerCase()})

    if (! targetUser) {
        return res.status(404).send(`Friend of ${targetEmail} has not been found. Please check email`)
    }

    // check if invitation has been already sent
    const Invitated = await FriendInvitation.findOne({receiverId: targetUser._id, senderId: userId})

    if (Invitated) {
        return res.status(409).send('Invitation has been already sent')
    }

    // If the user which we would like to invite is already our friend
    const alreayFriend = targetUser.friends.find(friendId => (friendId.toString() === userId.toString()))

    if (alreayFriend) {
        return res.status(409).send('Friend already added. Please check friends list')
    }

    // Create new invitation in database
    const newFriend = await FriendInvitation.create({senderId: userId, receiverId: targetUser._id})

    // If invitation has been successfully created we would like to update friends invitation
    // if other user is online

    // Send pending invitations update to specific user
    friendsUpdates.updateFriendsPendingInvitations(targetUser._id.toString());

    return res.status(201).send('Invitation has been sent')
}

const postAccept = async (req, res) => {
    try {
        const {id} = req.body;
        const {userId} = req.user;

        const invitation = await FriendInvitation.findById(id);

        if (! invitation) {
            return res.status(401).send("Error");
        }

        const {senderId, receiverId} = invitation;

        // add friend to both users
        const senderUser = await User.findById(senderId);
        const receiverUser = await User.findById(receiverId)

        senderUser.friends = [
            ... senderUser.friends,
            receiverId
        ];
        receiverUser.friends = [
            ... receiverUser.friends,
            senderId
        ]

        await senderUser.save()
        await receiverUser.save()

        // delete invitation from DB
        await FriendInvitation.findByIdAndDelete(id)

        // update list of the friends if the users are online
        friendsUpdates.updateFriends(senderId.toString())
        friendsUpdates.updateFriends(receiverId.toString())

        // update list of friends pending invitations
        friendsUpdates.updateFriendsPendingInvitations(receiverId.toString())

        return res.status(200).send('Friend successfully added')

    } catch (error) {
        console.log(error);
        return res.status(500).send('Something went wrong please try again')
    }
}
const postReject = async (req, res) => {
    try {
        const {id} = req.body;
        const {userId} = req.user;

        // remove invitation from DB
        const invitationExists = await FriendInvitation.exists({_id: id})

        if (invitationExists) {
            await FriendInvitation.findByIdAndDelete(id)
        }

        // update pending invitation
        friendsUpdates.updateFriendsPendingInvitations(userId)

        return res.status(200).send("Invitation succesfully rejected")

    } catch (error) {
        console.log(error);
        return res.status(500).send('Something went wrong please try again')
    }


}

const friendControllers = {
    postInvite,
    postAccept,
    postReject
};

module.exports = friendControllers;
