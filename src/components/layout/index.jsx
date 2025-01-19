import Footer from "@components/layout/Footer";
import Header from "@components/layout/Header";
import { Outlet } from "react-router-dom";

import useSidebarStore from "@zustand/sidebarStore";
import Sidebar from "@components/layout/Sidebar";

export default function Layout() {
  const { setSidebarOpen, isSidebarOpen } = useSidebarStore(); // 사이드바 상태

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <Header />
      <main className="pt-[70px]">
        <Outlet />
      </main>
      <Footer />
      {isSidebarOpen && <Sidebar closeSidebar={closeSidebar} />}
    </>
  );
}
