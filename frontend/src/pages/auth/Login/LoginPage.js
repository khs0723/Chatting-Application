import React, { useState } from "react";
import AuthBox from "../../../components/AuthBox";
import LoginFooter from "./LoginFooter";
import LoginHeader from "./LoginHeader";
import LoginInput from "./LoginInput";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const handleLogin = () => {
    console.log("login");
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

export default LoginPage;
