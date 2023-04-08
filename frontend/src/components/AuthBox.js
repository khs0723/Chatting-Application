import React from "react";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";

// const BoxWrapper = styled("div")({
//   width: "100%",
//   height: "100vh",
//   background: "#5D4E7B",
//   position: "relative",
// });

const BoxWrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  //background: "#5D4E7B",
  background: "#EDF2F7",
});

const AuthBox = (props) => {
  return (
    <>
      <BoxWrapper>
        <Box
          sx={{
            width: 700,
            height: 400,
            bgcolor: "#5D4E7B",
            borderRadius: "5px",
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
            display: "flex",
            flexDirection: "column",
            padding: "25px",
          }}
        >
          {props.children}
        </Box>
      </BoxWrapper>
    </>
  );
};

export default AuthBox;
