import React from "react";
import { styled } from "@mui/system";
import MainButton from "./MainButton";

const MainContainer = styled("div")({
  width: "72px",
  //width: "5%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  //backgroundColor: "#DBE3E5",
  backgroundColor: "#5D4E7B",
});

const SideBar = () => {
  return (
    <MainContainer>
      <MainButton />
    </MainContainer>
  );
};

export default SideBar;
