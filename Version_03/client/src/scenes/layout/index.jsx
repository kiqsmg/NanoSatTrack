import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";


const Layout = () => {
    const isNonMobile = useMediaQuery("(min-width: 600px)");  //identify if the screen is mobile or not
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <Box display={isNonMobile ? "flex" : "block" } /* flex for desktop and block for mobile */  width= "100%" height= "100%">
            <Sidebar 
                isNonMobile={isNonMobile}
                drawerWidth="300px"
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />
            <Box flexGrow={1}>
                <Navbar
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />
                <Outlet />
            </Box>
        </Box>
    );
};

export default Layout;