import React from "react";
import { styled } from "@mui/system";
import PendingInvitationsListItem from "./PendingInvitationsListItem";

const DUMMY_INVITATION = [
  {
    _id: "1",
    senderId: {
      username: "James",
      email: "James@gamil.com",
    },
  },
  {
    _id: "2",
    senderId: {
      username: "Sexking",
      email: "sex@gamil.com",
    },
  },
  {
    _id: "3",
    senderId: {
      username: "Muddy",
      email: "Muddy@gamil.com",
    },
  },
];

const MainContainer = styled("div")({
  width: "100%",
  height: "22%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  overflow: "auto",
});

const PendingInvitationsList = () => {
  return (
    <MainContainer>
      {DUMMY_INVITATION.map((i) => (
        <PendingInvitationsListItem
          key={i._id}
          id={i._id}
          username={i.senderId.username}
          email={i.senderId.email}
        />
      ))}
    </MainContainer>
  );
};

export default PendingInvitationsList;
