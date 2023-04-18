import React, {useState} from 'react'
import {styled} from '@mui/system';
import {connect} from 'react-redux';
import {sendDirectMessage} from '../../../socket/socketConnection';

const MainContainer = styled("div")({
    height: "60px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
});

const Input = styled("input")({
    backgroundColor: "white",
    width: "98%",
    height: "44px",
    color: "black",
    border: "1px solid #6A598C",
    borderRadius: "8px",
    fontSize: "14px",
    padding: "0 10px"
});


const NewMessageInput = ({chatDetails}) => {
    const [message, setMessage] = useState('');

    const handleMessage = (e) => {
        setMessage(e.target.value)

    }
    const handleKeyPressed = (e) => {
        if (e.key === "Enter") {
            handleSendMessage()
        }
    }

    const handleSendMessage = () => {
        console.log('sending message')

        if (message.length > 0) {
            sendDirectMessage({receiverUserId: chatDetails.id, content: message})
            setMessage('')

        }
    }

    return (
        <MainContainer>
            <Input placeholder={
                    `Write message to ${
                        chatDetails.name
                    }`
                }
                value={message}
                onChange={handleMessage}
                onKeyDown={handleKeyPressed}/>

        </MainContainer>
    )
}

const mapStoreStateToProps = ({chat}) => {
    return {
        ...chat
    }
}

export default connect(mapStoreStateToProps)(NewMessageInput)
