import api from "@/lib/api";
import { error } from "console";
import { create } from "zustand";

export interface Product {
  id: number;
  name: string;
  barcode: string;
  price: number;
  costPrice: number;
  stock: number;
  category?: {
    id: number;
    name: string;
  };
  supplier?: {
    id: number;
    name: string;
  };
  color?: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;

  fetchProducts: () => Promise<void>;
  searchProducts: (term: string) => Promise<void>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProducts: async () => {

    set({ isLoading: true, error: null})

    try {
      const response = await api.get('/products');
      set({ products: response.data, isLoading: false});
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
