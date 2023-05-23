import { Stack, Box } from "@mui/material";
import React from "react";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <MainHeader></MainHeader>
      <Outlet></Outlet>
      <Box sx={{ flexGrow: 1 }} />
      <MainFooter></MainFooter>
    </Stack>
  );
}

export default MainLayout;
