import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import SideBar from "./SideBar/SideBar";
import FriendsSideBar from "./FriendsSideBar/FriendsSideBar";
import Messenger from "./Messenger/Messenger";
import AppBar from "./AppBar/AppBar";
import { logout } from "../../utils/auth";
import { connect } from "react-redux";
import { getActions } from "../../store/actions/authAction";

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
});

const Dashboard = ({ setUserData }) => {
  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (!userData) {
      logout();
    } else {
      setUserData(JSON.parse(userData));
    }
  }, []);
  return (
    <Wrapper>
      <SideBar />
      <FriendsSideBar />
      <Messenger />
      <AppBar />
    </Wrapper>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(Dashboard);
