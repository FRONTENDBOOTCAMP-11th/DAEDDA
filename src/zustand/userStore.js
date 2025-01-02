import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const UserStore = set => ({
  user: null, // _id 값
  setUser: userData => set({ user: userData }),
  resetUser: () => set({ user: null }),
});

// 스토리지를 사용할 경우
const useUserStore = create(
  persist(UserStore, {
    name: "user",
    storage: createJSONStorage(() => sessionStorage), // 기본은 localStorage
  }),
);

export default useUserStore;
