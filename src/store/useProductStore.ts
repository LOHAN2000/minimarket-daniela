import api from "@/lib/api";
import { error } from "console";
import { create } from "zustand";
import { Product } from "../../types";

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;

  fetchProducts: () => Promise<void>;
  searchProducts: (term: string) => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null})

    try {
      const response = await api.get('/products');
      set({ products: response.data, isLoading: false});
      console.log(response.data)
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred in fetchProducts";
      set({ error: errorMessage, isLoading: false});
    }
  },

  searchProducts: async (term: string) => {

    set({ isLoading: true, error: null})

    try {
      const response = await api.get(`/products/search/${term}`)
      set({ products: response.data, isLoading: false});
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred in searchProducts";
      set({ error: errorMessage, isLoading: false})
    }
  }

}))
