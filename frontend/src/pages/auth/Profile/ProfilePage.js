import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getActions } from "../../../store/actions/authAction";

const ProfilePage = () => {
  const [email, setEmail] = useState("");
  useEffect(() => {
    const userData = localStorage.getItem("user");
    console.log(userData[email]);
    setEmail(userData.email);
  }, []);
  return <div>sss{email}</div>;
};
const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(ProfilePage);
