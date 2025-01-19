import { create } from "zustand";

const useSidebarStore = create(set => ({
  isSidebarOpen: false,
  setSidebarOpen: isOpen => set(() => ({ isSidebarOpen: isOpen })),
}));

export default useSidebarStore;
