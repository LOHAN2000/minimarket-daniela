import { create } from "zustand";

interface GlobalState {
  isSideBarCollapsed: boolean,
  setIsSideBarCollapsed: (collapsed: boolean) => void;
}

export const useGlobalState = create<GlobalState>((set) => ({
  isSideBarCollapsed: false,
  setIsSideBarCollapsed: (collapsed: boolean) => set({ isSideBarCollapsed: collapsed}),
}))