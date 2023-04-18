const Conversation = require("../models/conversation");
const Message = require("../models/message");
const chatUpdates = require('./updates/chat')
const directMessageHandler = async (socket, data) => {
    try {
        console.log("Direct Message Handler is working")
        const {userId} = socket.user;

        const {receiverUserId, content} = data;

        // Create new message
        const message = await Message.create({content: content, author: userId, date: new Date(), type: 'DIRECT'})

        // Find if conversation exist with this two users - if not create new
        const conversation = await Conversation.findOne({
            participants: {
                $all: [userId, receiverUserId]
            }
        })

        if (conversation) {
            conversation.messages.push(message._id)
            await conversation.save()

            // Perform and update to sender and receiver if is online
            chatUpdates.updateChatHistory(conversation._id.toString())

        } else { // create new conversation if not exists
            const newConversation = await Conversation.create({
                messages: [message._id],
                participants: [userId, receiverUserId]
            })

            chatUpdates.updateChatHistory(newConversation._id.toString())

        }

    } catch (error) {
        console.log(error)
    }
}

module.exports = directMessageHandler
