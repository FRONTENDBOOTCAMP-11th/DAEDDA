import { create } from "zustand";

const useAlarmExistStore = create(set => ({
  alarmExist: false,
  setAlarmExist: alarmExist => set({ alarmExist }),
  resetAlarmExist: () => set({ alarmExist: false }),
}));

export default useAlarmExistStore;
