import React from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import * as roomHandler from '../../../../socket/roomHandler'

const CloseRoomButton = () => {
    const handleLeaveRoom = () => { // roomHandler.leaveRoom();
        roomHandler.leaveRoom()
    };
    return (<IconButton onClick={handleLeaveRoom}
        style={
            {color: 'white'}
    }>
        <CloseIcon/>
    </IconButton>);
};

export default CloseRoomButton;
