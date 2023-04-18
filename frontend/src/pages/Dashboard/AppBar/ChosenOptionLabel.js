import {Typography} from "@mui/material"
import {connect} from 'react-redux'

const ChosenOptionLabel = ({name}) => {
    return (<Typography sx={
        {
            fontSize: "16px",
            color: "#5D4E7B",
            fontWeight: 'bold'
        }
    }> {
        `${
            name ? name : ''
        }`
    } </Typography>)
}

const mapStoreStateToProps = (state) => {
    return {
        name: state.chat.chatDetails ?. name
    }
}

export default connect(mapStoreStateToProps)(ChosenOptionLabel)
