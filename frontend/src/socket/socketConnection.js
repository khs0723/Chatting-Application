import io from "socket.io-client";
import {setPendingFriendsInvitations, setFriends, setOnlineUsers} from '../store/actions/friendsActions'
import store from '../store/store'
import {updateDirectChatHistoryIfActive} from '../utils/chat'
let socket = null;

export const connectWithSocketServer = (userData) => {
    const jwtToken = userData.token;

    socket = io("http://localhost:5002", {
        auth: {
            token: jwtToken
        }
    });

    socket.on("connect", () => {
        console.log("success connected with socket");

    });

    socket.on('friends-invitations', (data) => {
        const {pendingInvitations} = data;
        store.dispatch(setPendingFriendsInvitations(pendingInvitations))
    })

    socket.on('friends-list', (data) => {
        const {friends} = data;
        store.dispatch(setFriends(friends))
    })

    socket.on('online-users', (data) => {
        const {onlineUsers} = data
        store.dispatch(setOnlineUsers(onlineUsers))
    })

    socket.on('direct-chat-history', (data) => {
        updateDirectChatHistoryIfActive(data)
    })
};

export const sendDirectMessage = (data) => {
    console.log('send direct message socket connection', data)
    socket.emit('direct-message', data);
}

export const getDirectChatHistory = (data) => {
    console.log("getDirect chat hist")
    socket.emit('direct-chat-history', data)
}
