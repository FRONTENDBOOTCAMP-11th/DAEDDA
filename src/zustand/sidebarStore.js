import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const SidebarStore = set => ({
  isSidebarOpen: false,
  setSidebarOpen: isOpen => set(() => ({ isSidebarOpen: isOpen })),
});

// 스토리지를 사용할 경우
const useSidebarStore = create(
  persist(SidebarStore, {
    name: "sidebar",
    storage: createJSONStorage(() => sessionStorage),
  }),
);

export default useSidebarStore;
