import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

const RedirectText = styled("span")({
  color: "#FE8974",
  fontWeight: 500,
  cursor: "pointer",
});

const Redirect = ({
  text,
  redirectText,
  additionalStyles,
  redirectHandler,
}) => {
  return (
    <>
      <Typography
        sx={{
          color: "white",
        }}
        style={additionalStyles ? additionalStyles : {}}
        variant="subtitle2"
      >
        {text}
        <RedirectText onClick={redirectHandler}>{redirectText}</RedirectText>
      </Typography>
    </>
  );
};

export default Redirect;
