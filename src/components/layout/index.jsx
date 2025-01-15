import Footer from "@components/layout/Footer";
import Header from "@components/layout/Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Header />
      <main className="pt-[70px]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
