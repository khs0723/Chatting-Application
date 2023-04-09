import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import AuthBox from "../../../components/AuthBox";
import RegisterFooter from "./RegisterFooter";
import RegisterInput from "./RegisterInput";
import { validateRegisterForm } from "../../../utils/validator";
import { connect } from "react-redux";
import { getActions } from "../../../store/actions/authAction";
import { useNavigate } from "react-router-dom";

const RegisterPage = ({ register }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  const handleRegister = () => {
    const userData = {
      email,
      password,
      username,
    };
    register(userData, navigate);
  };

  useEffect(() => {
    setIsFormValid(
      validateRegisterForm({
        email,
        username,
        password,
      })
    );
  }, [email, username, password, setIsFormValid]);
  return (
    <AuthBox>
      <Typography variant="h5" sx={{ color: "white" }}>
        Create an account
      </Typography>
      <RegisterInput
        email={email}
        setEmail={setEmail}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
      <RegisterFooter
        handleRegister={handleRegister}
        isFormValid={isFormValid}
      />
    </AuthBox>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(RegisterPage);
