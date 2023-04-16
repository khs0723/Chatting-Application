import Dialog from "@mui/material/Dialog";
import React, {useEffect, useState} from "react";
import {validateEmail} from "../../../utils/validator";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {Typography} from "@mui/material";
import InputLabel from "../../../components/InputLabel";
import CustomPrimaryButton from "../../../components/CustomPrimaryButton";
import {connect} from 'react-redux';
import {getActions} from "../../../store/actions/friendsActions";

const AddFriend = ({
    isDialogOpen,
    closeDialogHandler,
    sendFriendInvitation = () => {}
}) => {
    const [email, setEmail] = useState("");
    const [isFormValid, setIsFormValid] = useState("");

    const handleSendInvitation = () => {
        sendFriendInvitation({
            targetEmail: email
        }, handleCloseDialog)
    };

    const handleCloseDialog = () => {
        closeDialogHandler();
        setEmail("");
    };

    useEffect(() => {
        setIsFormValid(validateEmail(email));
    }, [email, setIsFormValid]);

    return (
        <Dialog open={isDialogOpen}
            onClose={handleCloseDialog}>
            <DialogTitle>
                <Typography>Invite a Friend</Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Typography>
                        Enter e-mail of friend which you would like to invite
                    </Typography>
                </DialogContentText>
                <InputLabel //label="Email"
                    type="text"
                    value={email}
                    setValue={setEmail}
                    placeholder="Enter email address"/>
            </DialogContent>
            <DialogActions>
                <CustomPrimaryButton onClick={handleSendInvitation}
                    disabled={
                        !isFormValid
                    }
                    label="Send"
                    additionalStyles={
                        {
                            marginLeft: "15px",
                            marginRight: "15px",
                            marginBottom: "10px"
                        }
                    }/>
            </DialogActions>
        </Dialog>
    );
};

const mapActionsToProps = (dipatch) => {
    return {
        ...getActions(dipatch)
    }
}

export default connect(null, mapActionsToProps)(AddFriend);
