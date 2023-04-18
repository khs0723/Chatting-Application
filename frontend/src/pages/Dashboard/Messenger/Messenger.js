import React from "react";
import {styled} from "@mui/system";
import {connect} from 'react-redux';

import WelcomeMessage from './WelcomMessage'
import MessengerContent from './MessengerContent'

const MainContainer = styled("div")({
    flexGrow: 1,
    // backgroundColor: "#EBF4F5",
    backgroundColor: "WHITE",
    marginTop: "48px",
    display: "flex"
});

const Messenger = ({chatDetails}) => {
    return (
        <MainContainer> {
            !chatDetails ? (
                <WelcomeMessage/>) : <MessengerContent chatDetails={chatDetails}/>
        } </MainContainer>
    )
};

const mapStoreStateToProps = ({chat}) => {
    return {
        ...chat
    }
}

export default connect(mapStoreStateToProps)(Messenger);
