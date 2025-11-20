import React from "react";
import { Outlet } from "react-router";
import MainFooter from "../../../Components/Footer/MainFooter";

export default function Layout() {
  return (
    <>
      <Outlet />
      <MainFooter />
    </>
  );
}
