import React from "react";
import { styled } from "@mui/system";

const Wrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  width: "100%",
});

const Label = styled("p")({
  color: "white",
  textTransform: "uppercase",
  fontWeight: "600",
  fontSize: "16px",
});

const Input = styled("input")({
  flexGrow: 1,
  height: "40px",
  border: "1px solid black",
  borderRadius: "5px",
  color: "#3B3B3F",
  background: "#EDF2F7",
  margin: 0,
  fontSize: "16px",
  paddign: "0 5px",
});

const InputLabel = (props) => {
  const { value, setValue, label, type, placeholder } = props;
  const handleValue = (e) => {
    setValue(e.target.value);
  };
  return (
    <Wrapper>
      <Label>{label}</Label>
      <Input
        value={value}
        onChange={handleValue}
        type={type}
        placeholder={placeholder}
      />
    </Wrapper>
  );
};

export default InputLabel;
