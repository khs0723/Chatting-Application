import React from "react";
import {Typography} from "@mui/material";
import {Box} from "@chakra-ui/layout";
import {Flex} from "@chakra-ui/layout";
import {Spacer} from "@chakra-ui/layout";
import {HStack} from "@chakra-ui/layout";
import {Text} from "@chakra-ui/layout";

const LoginHeader = () => {
    return (
        <>
            <Typography variant="h5"
                sx={
                    {color: "white"}
            }>
                Welcome Back!
            </Typography>
            <Typography sx={
                {color: "#E5E6F1"}
            }>
                We are happy that you are with us!
            </Typography>
        </>
    );
};

export default LoginHeader;
