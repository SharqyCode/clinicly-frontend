import React from "react";
import { Outlet } from "react-router";
import MainFooter from "../../../Components/Footer/MainFooter";
import Logo from "../../../Components/Navigation/Logo";

export default function Layout() {
  return (
    <>
      <header className=" bg-[var(--color-bg-light-secondary)] p-4">
        <Logo />
      </header>
      <Outlet />
      <MainFooter />
    </>
  );
}
