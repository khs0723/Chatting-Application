import React, {useRef, useEffect} from 'react'
import {styled} from "@mui/system";
import MessagesHeader from './MessagesHeader'
import {connect} from 'react-redux';
import DUMMY from './DUMMY';
import Message from './Message';
import DateSeparator from "./DateSeparator"

const MainContainer = styled('div')({
    height: 'calc(100% - 60px)',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
})

const convertDateToHumanReadable = (date, format) => {
    const map = {
        mm: date.getMonth() + 1,
        dd: date.getDate(),
        yy: date.getFullYear().toString().slice(-2),
        yyyy: date.getFullYear()
    };

    return format.replace(/mm|dd|yy|yyyy/gi, (matched) => map[matched])
}

const Messages = ({chatDetails, messages}) => {
    return (<MainContainer>
        <MessagesHeader name={
            chatDetails ?. name
        }/> {
        messages.map((message, index) => {
            const sameAuthor = index > 0 && messages[index].author._id === messages[index - 1].author._id;
            const sameDay = index > 0 && convertDateToHumanReadable(new Date(message.date), 'mm/dd/yy') === convertDateToHumanReadable(new Date(messages[index - 1].date), 'mm/dd/yy')
            return (<div key={
                    message._id
                }
                style={
                    {width: "97%"}
            }> {
                (! sameDay || index === 0) && (<DateSeparator date={
                    convertDateToHumanReadable(new Date(message.date), "mm/dd/yy")
                }/>)
            }
                <Message content={
                        message.content
                    }
                    username={
                        message.author.username
                    }
                    sameAuthor={sameAuthor}
                    date={
                        convertDateToHumanReadable(new Date(message.date), 'mm/dd/yy')
                    }
                    sameDay={sameDay}/>
            </div>)
        })
    } </MainContainer>)
}

const mapStoreStateToProps = ({chat}) => {
    return {
        ...chat
    };
};

export default connect(mapStoreStateToProps)(Messages)
