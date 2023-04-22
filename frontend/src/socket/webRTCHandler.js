import store from "../store/store";
import {setLocalStream, setRemoteStreams} from "../store/actions/roomActions";
import Peer from 'simple-peer'
import * as socketConnection from './socketConnection';

const getConfiguration = () => {
    const turnIceServers = null;

    if (turnIceServers) {
        // TODO
        // use turn server credentials
    } else {
        console.warn('Using only STUN server')
        return {
            iceServers: [
                {
                    urls: 'stun:stun.l.google.com:19302'
                }
            ]
        }

    }
}

const onlyAudioConstraints = {
    audio: true,
    video: false
}

const defaultConstraints = {
    audio: true,
    video: true
}

export const getLocalStreamPreview = (onlyAudio = false, callback) => {
    const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;

    navigator.mediaDevices.getUserMedia(constraints).then(stream => {
        store.dispatch(setLocalStream(stream))
        callback()
    }).catch(err => {
        console.log(err);
        console.log('Cannot get an access to local stream')
    })
}

let peers = {}

export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
    const localStream = store.getState().room.localStream

    if (isInitiator) {
        console.log('preparing new peer connection as init')
    } else {
        console.log('not init')
    } peers[connUserSocketId] = new Peer({initiator: isInitiator, config: getConfiguration(), stream: localStream});

    peers[connUserSocketId].on('signal', data => {
        const signalData = {
            signal: data,
            connUserSocketId: connUserSocketId
        }

        socketConnection.signalPeerData(signalData)


    })

    peers[connUserSocketId].on('stream', (remoteStream) => {

        console.log('remote stream came from other user')
        console.log('direct connection has been established')
        remoteStream.connUserSocketId = connUserSocketId;
        addNewRemoteStream(remoteStream);

    })

}

export const handleSignalingData = (data) => {
    const {connUserSocketId, signal} = data;

    if (peers[connUserSocketId]) {
        peers[connUserSocketId].signal(signal);
    }
}

const addNewRemoteStream = (remoteStream) => {
    const remoteStreams = store.getState().room.remoteStreams;
    const newRemoteStreams = [
        ... remoteStreams,
        remoteStream
    ]

    store.dispatch(setRemoteStreams(newRemoteStreams))
}

export const closeAllConnections = () => {
    Object.entries(peers).forEach(mappedObject => {
        const connUserSocketId = mappedObject[0];
        if (peers[connUserSocketId]) {
            peers[connUserSocketId].destroy();
            delete peers[connUserSocketId];
        }
    })
}

export const handleParticipantLeftRoom = (data) => {
    console.log("1")
    const {connUserSocketId} = data;

    if (peers[connUserSocketId]) {
        console.log("2")
        peers[connUserSocketId].destroy();
        delete peers[connUserSocketId]
    }
    console.log("3")
    const remoteStreams = store.getState().room.remoteStreams;
    console.log("4")
    const newRemoteStreams = remoteStreams.filter(remoteStream => remoteStream.connUserSocketId !== connUserSocketId)
    console.log('5')
    console.log(newRemoteStreams)
    store.dispatch(setRemoteStreams(newRemoteStreams))
}
