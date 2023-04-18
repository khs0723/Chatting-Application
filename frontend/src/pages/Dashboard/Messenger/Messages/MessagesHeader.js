import React from 'react'
import {styled} from "@mui/system";
import Avatar from '../../../../components/Avatar';
import {Typography} from '@mui/material';

const MainContainer = styled('div')({width: '98%', display: 'column', marginTop: '10px'})

const MessagesHeader = ({
    name = ''
}) => {
    return (<MainContainer>
        <Avatar large
            username={name}/>
        <Typography variant='h4'
            sx={
                {
                    fontWeight: 'bold',
                    color: '#323131',
                    marginLeft: '5px',
                    marginRight: '5px'
                }
        }> {name} </Typography>
        <Typography sx={
            {
                color: '#323131',
                marginLeft: '5px',
                marginRight: '5px'
            }
        }>
            This is the begging converstaion with {name} </Typography>
    </MainContainer>)
}

export default MessagesHeader
