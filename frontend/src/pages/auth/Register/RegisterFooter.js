import React from "react";
import CustomPrimaryButton from "../../../components/CustomPrimaryButton";
import Redirect from "../../../components/Redirect";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";

const getFormNotValidMessage = () => {
  return "Username should contains between 3 and 12 characters and password should contains between 6 and 12 characters. Also correct e-mail should provided";
};

const getFormValidMessage = () => {
  return "Press to register";
};

const RegisterFooter = ({ handleRegister, isFormValid }) => {
  const navigate = useNavigate();
  const handlePushToLogin = () => {
    navigate("/login");
  };
  return (
    <>
      <Tooltip
        title={isFormValid ? getFormValidMessage() : getFormNotValidMessage()}
      >
        <div>
          <CustomPrimaryButton
            label="Register"
            additionalStyles={{ marginTop: "30px" }}
            disabled={!isFormValid}
            onClick={handleRegister}
          />
        </div>
      </Tooltip>
      <Redirect
        text=""
        redirectText="Alreay have an account?"
        additionalStyles={{ marginTop: "5px" }}
        redirectHandler={handlePushToLogin}
      />
    </>
  );
};

export default RegisterFooter;
