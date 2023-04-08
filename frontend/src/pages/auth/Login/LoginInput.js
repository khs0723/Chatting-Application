import React from "react";
import InputLabel from "../../../components/InputLabel";

const LoginInput = ({ email, setEmail, password, setPassword }) => {
  return (
    <>
      <InputLabel
        value={email}
        setValue={setEmail}
        label="E-mail"
        type="text"
        placeholder="Enter E-mail"
      />
      <InputLabel
        value={password}
        setValue={setPassword}
        label="Password"
        type="password"
        placeholder="Enter password"
      />
    </>
  );
};

export default LoginInput;
