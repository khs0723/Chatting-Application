import React, { useState, useEffect } from "react";
import AuthBox from "../../../components/AuthBox";
import LoginFooter from "./LoginFooter";
import LoginHeader from "./LoginHeader";
import LoginInput from "./LoginInput";
import { validateLoginForm } from "../../../utils/validator";
import { connect } from "react-redux";
import { getActions } from "../../../store/actions/authAction";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsFormValid(validateLoginForm({ email, password }));
  }, [email, password, setIsFormValid]);

  const handleLogin = () => {
    const userData = {
      email,
      password,
    };

    login(userData, navigate);
  };

  return (
    <>
      <AuthBox>
        <LoginHeader />
        <LoginInput
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />
        <LoginFooter handleLogin={handleLogin} isFormValid={isFormValid} />
      </AuthBox>
    </>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(LoginPage);
