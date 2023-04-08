import React from "react";
import Button from "@mui/material/Button";

const CustomPrimaryButton = ({
  label,
  additionalStyles,
  disabled,
  onClick,
}) => {
  return (
    <Button
      variant="outlined"
      sx={{
        bgcolor: "#FE8974",
        color: "#FFFAF9",
        textTransform: "none",
        border: "1px solid black",
        fontSize: "16px",
        fontWeight: 600,
        width: "100%",
        height: "40px",
        ":hover": {
          bgcolor: "#F5674D",
          //color: "#5D4E7B",
        },
      }}
      style={additionalStyles ? additionalStyles : {}}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default CustomPrimaryButton;
