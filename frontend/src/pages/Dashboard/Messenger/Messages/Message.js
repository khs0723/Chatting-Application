import React from 'react'
import {styled} from '@mui/system'
import Avatar from '../../../../components/Avatar'
import {Typography} from '@mui/material'

const MainContainer = styled('div')({width: '97%', display: 'flex', marginTop: '10px'})

const AvatarContainer = styled('div')({width: '70px'})

const MessageContainer = styled('div')({display: 'flex', flexDirection: 'column'})

const MessageContent = styled('div')({color: '#323131'})

const SameAuthorMessageContent = styled('div')({color: '#323131', width: '97%'})

const SameAuthorMessageText = styled('span')({marginLeft: '70px'})

const Message = ({
    content,
    sameAuthor,
    username,
    date,
    sameDay
}) => {
    if (sameAuthor && sameDay) {
        return (<SameAuthorMessageContent>
            <SameAuthorMessageText> {content}</SameAuthorMessageText>
        </SameAuthorMessageContent>)
    }
    return (<MainContainer>
        <AvatarContainer>
            <Avatar username={username}/>
        </AvatarContainer>
        <MessageContainer>
            <Typography style={
                {
                    fontSize: '16px',
                    color: '#323131'
                }
            }> {username}
                {' '}
                <span style={
                    {
                        fontSize: '12px',
                        color: '#323131'
                    }
                }> {date} </span>
            </Typography>
            <MessageContent> {content} </MessageContent>
        </MessageContainer>
    </MainContainer>)
}

export default Message