import Footer from "@components/layout/Footer";
// import MainHeader from "@components/layout/MainHeader";
import TitleHeader from "@components/layout/TitleHeader";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <TitleHeader />
      <Outlet />
      <Footer />
    </>
  );
}
