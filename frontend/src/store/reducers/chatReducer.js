import {chatActions} from "../actions/chatActions";

const initialState = {
    chatDetails: null,
    chatType: null,
    messages: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case chatActions.SET_CHAT_DETAILS:
            return {
                ...state,
                chatDetails: action.chatDetails,
                chatType: action.chatType,
                messages: []
            }
        case chatActions.SET_MESSAGES:
            return {
                ...state,
                messages: action.messages
            }
        default:
            return state;
    }
}

export default reducer
