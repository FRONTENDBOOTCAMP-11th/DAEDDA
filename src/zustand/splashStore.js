import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const SplashStore = set => ({
  isSplashShown: false, // 스플래쉬가 보여지고 있는가
  hasShownSplash: false, // 스플래쉬를 보여줬는가

  showSplash: () => {
    set({ isSplashShown: true, hasShownSplash: true });
    setTimeout(() => {
      set({ isSplashShown: false });
    }, 2000);
  },
});

const useSplashStore = create(
  persist(SplashStore, {
    name: "isShown",
    storage: createJSONStorage(() => sessionStorage),
  }),
);

export default useSplashStore;
