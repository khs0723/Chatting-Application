import React from "react";
import InputLabel from "../../../components/InputLabel";

const RegisterInput = (props) => {
  const { email, setEmail, username, setUsername, password, setPassword } =
    props;
  return (
    <>
      <InputLabel
        value={email}
        setValue={setEmail}
        label="E-mail"
        type="text"
        placeholder="Enter the E-mail"
      />
      <InputLabel
        value={username}
        setValue={setUsername}
        label="Username"
        type="text"
        placeholder="Enter the Username"
      />
      <InputLabel
        value={password}
        setValue={setPassword}
        label="Password"
        type="password"
        placeholder="Enter the password"
      />
    </>
  );
};

export default RegisterInput;
