import React, {useEffect} from 'react'
import {Typography} from '@mui/material'
import {styled} from '@mui/system'
import Messages from './Messages/Messages'
import NewMessageInput from './NewMessageInput'
import {getDirectChatHistory} from '../../../socket/socketConnection'

const Wrapper = styled("div")({flexGrow: 1});const MessengerContent = ({chatDetails}) => {
useEffect(() => {
    getDirectChatHistory({receiverUserId: chatDetails.id})
}, [chatDetails]);
return (
    <Wrapper>
        <Messages/>
        <NewMessageInput/>
    </Wrapper>
);};export default MessengerContent;
