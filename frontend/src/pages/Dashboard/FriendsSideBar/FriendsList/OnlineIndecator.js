import React from "react";
import { Box } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const OnlineIndecator = () => {
  return (
    <Box
      sx={{
        color: "#74BA98",
        display: "flex",
        alignItems: "center",
        position: "absolute",
        right: "5px",
      }}
    >
      <FiberManualRecordIcon />
    </Box>
  );
};

export default OnlineIndecator;
