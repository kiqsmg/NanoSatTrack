import { Typography, Box, useTheme, useThemeProps } from "@mui/material";
import { isValidDateValue } from "@testing-library/user-event/dist/utils";
import React from "react";

const Header = ({ title, subtitle }) => {
    const theme = useTheme();
    return (
        <Box>
            <Typography varient="h2" color={theme.palette.secondary[100]} fontWeight="bold" sx={{ mb: "5px"}} >
                {title}
            </Typography>

            <Typography varient="h5" color={theme.palette.secondary[300]} >
                {subtitle}
            </Typography>
        </Box>
    );
};


export default Header;