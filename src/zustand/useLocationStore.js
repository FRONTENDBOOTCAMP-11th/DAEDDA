import { create } from "zustand";

const useLocationStore = create(set => ({
  address: "",
  position: { lat: 33.450701, lng: 126.570667 },
  setAddress: address => set(state => ({ ...state, address })),
  setPosition: position => set(state => ({ ...state, position })),
}));

export default useLocationStore;
