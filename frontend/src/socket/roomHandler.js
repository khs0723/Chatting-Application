import {
    setOpenRoom,
    setRoomDetails,
    setActiveRooms,
    setLocalStream,
    setRemoteStreams
} from '../store/actions/roomActions';
import store from '../store/store';
import * as socketConnection from './socketConnection';
import * as webRTCHandler from './webRTCHandler';

export const createNewRoom = () => {
    const successCallback = () => {
        store.dispatch(setOpenRoom(true, true));
        socketConnection.createNewRoom();
    }

    const audioOnly = store.getState().room.audioOnly
    webRTCHandler.getLocalStreamPreview(audioOnly, successCallback)
};

export const newRoomCreated = (data) => {
    const {roomDetails} = data;

    store.dispatch(setRoomDetails(roomDetails));
};

export const updateActiveRooms = (data) => {
    const {activeRooms} = data;

    const friends = store.getState().friends.friends;
    const userId = store.getState().auth.userData ?. _id;

    const rooms = [];
    console.log(activeRooms);
    activeRooms.forEach((room) => {
        const isRoomCreatedByMe = room.roomCreator.userId === userId;

        if (isRoomCreatedByMe) {
            rooms.push({
                ...room,
                creatorUsername: "Me"
            });
        } else {
            friends.forEach((f) => {
                if (f.id === room.roomCreator.userId) {
                    rooms.push({
                        ...room,
                        creatorUsername: f.username
                    });
                }
            });
        }
    });
    store.dispatch(setActiveRooms(rooms));
};

export const joinRoom = (roomId) => {
    const successCallback = () => {
        store.dispatch(setRoomDetails({roomId}));
        store.dispatch(setOpenRoom(false, true));
        socketConnection.joinRoom({roomId});
    }

    const audioOnly = store.getState().room.audioOnly
    webRTCHandler.getLocalStreamPreview(audioOnly, successCallback)

};

export const leaveRoom = () => {
    const roomId = store.getState().room.roomDetails.roomId;
    const localStream = store.getState().room.localStream;
    if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
        store.dispatch(setLocalStream(null));

    }

    store.dispatch(setRemoteStreams([]));
    webRTCHandler.closeAllConnections();
    socketConnection.leaveRoom({roomId});
    store.dispatch(setRoomDetails(null));
    store.dispatch(setOpenRoom(false, false));
}
