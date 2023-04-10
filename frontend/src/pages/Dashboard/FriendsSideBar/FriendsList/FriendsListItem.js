import React from "react";
import Button from "@mui/material/Button";
import Avatar from "../../../../components/Avatar";
import { Typography } from "@mui/material";
import OnlineIndecator from "./OnlineIndecator";

const FriendsListItem = ({ id, username, isOnline }) => {
  return (
    <Button
      style={{
        width: "100%",
        height: "42px",
        marginTop: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        textTransform: "none",
        color: "black",
        position: "relative",
      }}
    >
      <Avatar username={username} />
      <Typography
        style={{ marginLeft: "7px", fontWeight: 700, color: "#EDF2F7" }}
        variant="subtitle1"
        align="left"
      >
        {username}
      </Typography>
      {isOnline && <OnlineIndecator />}
    </Button>
  );
};

export default FriendsListItem;
