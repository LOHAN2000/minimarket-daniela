import { create } from "zustand";
import { CreateSaleDto, Sale, StoreResult } from "../../types";
import api from "@/lib/api";
import { AxiosError } from "axios";

interface SalesState {
  
  ticket: Sale | null;
  isLoadingSale: boolean;
  isLoadingTicket: boolean;
  error: string | null;

  createSale: (saleData: CreateSaleDto) => StoreResult<void>;
  getTicket: (ticketCode: string) => StoreResult<any>;
}

export const useSalesStore = create<SalesState>((set) => ({

  ticket: null,
  isLoadingSale: false,
  isLoadingTicket: false,
  error: null,

  createSale: async (saleData) => {
    set({ isLoadingSale: true });

    try {
      const response = await api.post('/sales', saleData);
      set({ isLoadingSale: false })
      console.log(response.data)
      return { success: true, data: response.data };
    } catch (error) {
      const err = error as AxiosError;
      const errorMessage = err.response?.data as string || "An unknown error occurred";
      set({ error: errorMessage, isLoadingSale: false})
      return { success: false, error: errorMessage };
    }
  },

  getTicket: async (ticketCode) => {
    set({ isLoadingSale: true });
    
    try {
      const response = await api.get(`/sales/ticket/${ticketCode}`);
      set({ ticket: response.data, isLoadingTicket: false });
      return { success: true, data: response.data };
    } catch (error) {
      const err = error as AxiosError;
      const errorMessage = err.response?.data as string || "An unknown error occurred";
      set({ error: errorMessage, isLoadingTicket: false})
      return { success: false, error: errorMessage };
    }
  }

}))