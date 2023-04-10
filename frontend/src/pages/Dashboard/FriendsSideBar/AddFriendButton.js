import React, { useState } from "react";
import { styled } from "@mui/system";
import CustomPrimaryButton from "../../../components/CustomPrimaryButton";
import AddFriend from "./AddFriend";

const additionalStyles = {
  marginTop: "10px",
  marginLeft: "5px",
  width: "80%",
  height: "30px",
  color: "#6A598C",
  background: "#EDF2F7",
};

const AddFriendButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenAddFriend = () => {
    setIsDialogOpen(true);
  };

  const handleCloseAddFrined = () => {
    setIsDialogOpen(false);
  };
  return (
    <>
      <CustomPrimaryButton
        additionalStyles={additionalStyles}
        label="Add Friend"
        onClick={handleOpenAddFriend}
      />
      <AddFriend
        isDialogOpen={isDialogOpen}
        closeDialogHandler={handleCloseAddFrined}
      />
    </>
  );
};

export default AddFriendButton;
