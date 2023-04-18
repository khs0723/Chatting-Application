import React from "react";
import Button from "@mui/material/Button";
import Avatar from "../../../../components/Avatar";
import {Typography} from "@mui/material";
import OnlineIndecator from "./OnlineIndecator";
import {chatTypes, getActions} from "../../../../store/actions/chatActions";
import {connect} from 'react-redux'

const FriendsListItem = ({id, username, isOnline, setChatDetails}) => {

    const handleChooseActiveConversation = () => {
        setChatDetails({
            id: id,
            name: username
        }, chatTypes.DIRECT)
    }

    return (<Button onClick={handleChooseActiveConversation}
        style={
            {
                width: "100%",
                height: "42px",
                marginTop: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                textTransform: "none",
                color: "black",
                position: "relative"
            }
    }>
        <Avatar username={username}/>
        <Typography style={
                {
                    marginLeft: "7px",
                    fontWeight: 700,
                    color: "#EDF2F7"
                }
            }
            variant="subtitle1"
            align="left"> {username} </Typography>
        {
        isOnline && <OnlineIndecator/>
    } </Button>);
};

const mapActionsToProps = (dispatch) => {
    return {
        ...getActions(dispatch)
    }
}

export default connect(null, mapActionsToProps)(FriendsListItem);
