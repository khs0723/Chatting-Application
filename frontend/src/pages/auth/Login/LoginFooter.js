import React from "react";
import CustomPrimaryButton from "../../../components/CustomPrimaryButton";
import Redirect from "../../../components/Redirect";

const LoginFooter = ({ handleLogin, isFormValid }) => {
  const handlePushToRegister = () => {};
  return (
    <>
      <div>
        <CustomPrimaryButton
          label="Login"
          additionalStyles={{ marginTop: "30px" }}
          disabled={!isFormValid}
          onClick={handleLogin}
        />
      </div>
      <Redirect
        text="Need an account?"
        redirectText="Create an account!"
        additionalStyles={{ marginTop: "5px" }}
        redirectHandler={handlePushToRegister}
      />
    </>
  );
};

export default LoginFooter;
