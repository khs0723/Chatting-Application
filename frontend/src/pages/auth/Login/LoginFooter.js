import React from "react";
import CustomPrimaryButton from "../../../components/CustomPrimaryButton";
import Redirect from "../../../components/Redirect";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";

const getFormNotValidMessage = () => {
  return "Enter correct E-mail and password should contains between 6 and 12 characters";
};

const getFormValidMessage = () => {
  return "Press to login";
};

const LoginFooter = ({ handleLogin, isFormValid }) => {
  const navigate = useNavigate();
  const handlePushToRegister = () => {
    navigate("/register");
  };
  return (
    <>
      <Tooltip
        title={isFormValid ? getFormValidMessage() : getFormNotValidMessage()}
      >
        <div>
          <CustomPrimaryButton
            label="Login"
            additionalStyles={{ marginTop: "30px" }}
            disabled={!isFormValid}
            onClick={handleLogin}
          />
        </div>
      </Tooltip>
      <Redirect
        text="Need an account? "
        redirectText="Create an account!"
        additionalStyles={{ marginTop: "5px" }}
        redirectHandler={handlePushToRegister}
      />
    </>
  );
};

export default LoginFooter;
