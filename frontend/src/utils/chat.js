import store from '../store/store'
import {setMessages} from '../store/actions/chatActions'


export const updateDirectChatHistoryIfActive = (data) => {
    const {participants, messages} = data

    // Find id of user from token and id from active conversation
    const receiverId = store.getState().chat.chatDetails ?. id
    const userId = store.getState().auth.userData._id

    if (receiverId && userId) {
        const usersInConversation = [receiverId, userId];

        updateChatHistoryIfSameConversationActive({participants, usersInConversation, messages})
    }
}

const updateChatHistoryIfSameConversationActive = ({participants, usersInConversation, messages}) => {
    console.log("update chat ")
    const result = participants.every(function (participantId) {
        return usersInConversation.includes(participantId)
    })
    if (result) {
        store.dispatch(setMessages(messages))
    }
}
