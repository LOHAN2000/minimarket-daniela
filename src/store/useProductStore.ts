import api from "@/lib/api";
import { create } from "zustand";
import { Category, newCategory, Product } from "../../types";
import { toast } from "sonner";

interface ProductState {
  products: Product[];
  categories: Category[];
  isLoading: boolean;
  error: string | null;

  fetchProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>
  searchProducts: (term: string) => Promise<void>;
  createCategory: (newCategory: newCategory) => Promise<void>
  fetchSupplierRuc: (ruc: string) => Promise<void>;
}

//me dio pereza terminar, queda implementar la logica del fetch de sunatApi

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  categories: [],
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
  },

  fetchCategories: async () => {
    set({ isLoading: true, error: null})

    try {
      const response = await api.get('/Categories');
      set({ categories: response.data, isLoading: false});
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred in fetchProducts";
      set({ error: errorMessage, isLoading: false});
    }
  },

  createCategory: async (newCategory) => {
    set({ isLoading: true, error: null})

    try {
      const response = await api.post('/Categories', newCategory);

      set((state) => ({
        categories: [...state.categories, response.data],
        isLoading: false
      }))

      toast.success("Categoría creada exitosamente")
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred in fetchProducts";
      set({ error: errorMessage, isLoading: false});
    }
  }

}))
