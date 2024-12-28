import Footer from "@components/layout/Footer";
import MainHeader from "@components/layout/MainHeader";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <MainHeader />
      <main className="my-[80px]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
