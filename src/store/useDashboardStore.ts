import { create } from "zustand";
import { DashboardData } from "../../types";
import api from "@/lib/api";

interface DashboardState {
  stats: DashboardData | null;
  isLoading: boolean;
  error: string | null;

  fetchStats: () => Promise<void>;
}

export const useDashBoardStore = create<DashboardState>((set) => ({
  stats: null,
  isLoading: false,
  error: null,

  fetchStats: async () => {
    set({isLoading: true, error: null});

    try {
      const response = await api.get('/dashboard/stats');
      set({ stats: response.data,  isLoading: false})
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred in fetchDashboardStats";
      set({ error: errorMessage, isLoading: false});
    }
  }
})) 