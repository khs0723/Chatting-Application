import React from "react";
import Button from "@mui/material/Button";
import GroupsIcon from "@mui/icons-material/Groups";

const MainButton = () => {
  return (
    <Button
      style={{
        width: "48px",
        height: "48px",
        borderRadius: "16px",
        margin: 0,
        padding: 0,
        minWidth: 0,
        marginTop: "10px",
        color: "white",
        backgroundColor: "#FE8872",
      }}
    >
      <GroupsIcon />
    </Button>
  );
};

export default MainButton;
