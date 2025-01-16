import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const SidebarStore = set => ({
  isSidebarOpen: false,
  setSidebarOpen: isOpen => set(() => ({ isSidebarOpen: isOpen })),
  // openSidebar: () => set({ isSidebarOpen: true }), // 사이드바 열리면 true
  // closeSidebar: () => set({ isSidebarOpen: false }), // 닫히면 false
});

// 스토리지를 사용할 경우
const useSidebarStore = create(
  persist(SidebarStore, {
    name: "sidebar",
    storage: createJSONStorage(() => sessionStorage),
  }),
);

export default useSidebarStore;
