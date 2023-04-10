import { Box, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import Avatar from "../../../../components/Avatar";
import DecisionButton from "./DecisionButton";

const PendingInvitationsListItem = ({
  id,
  username,
  email,
  acceptFriendInvitation = () => {},
  rejectFriendInvitation = () => {},
}) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const handleAccept = () => {
    acceptFriendInvitation({ id });
    setButtonDisabled(true);
  };
  const handleReject = () => {
    rejectFriendInvitation({ id });
    setButtonDisabled(true);
  };
  return (
    <Tooltip title={email}>
      <div style={{ width: "100%" }}>
        <Box
          sx={{
            width: "100%",
            height: "42px",
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Avatar username={username} />
          <Typography
            sx={{
              marginLeft: "7px",
              fontWeight: 700,
              color: "#EDF2F7",
              flexGrow: 1,
            }}
            variant="subtitle1"
          >
            {username}
          </Typography>
          <DecisionButton
            disabled={buttonDisabled}
            acceptInvitation={handleAccept}
            rejectInvitation={handleReject}
          />
        </Box>
      </div>
    </Tooltip>
  );
};

export default PendingInvitationsListItem;
