import api from "@/lib/api";
import { create } from "zustand";
import { Category, newCategory, newProduct, NewSupplier, Product, Supplier, SupplierApi } from "../../types";
import { toast } from "sonner";

interface ProductState {
  products: Product[];
  categories: Category[];
  supplierSunatApi: SupplierApi | null;
  suppliers: Supplier[];
  isLoading: boolean
  isLoadingCategory: boolean;
  isLoadingSupplier: boolean;
  isLoadingSupplierCreate: boolean;
  isLoadingSupplierSearch: boolean;
  isLoadingProduct: boolean;
  error: string | null;

  fetchProducts: () => Promise<void>;
  createProduct: (product: newProduct) => Promise<void>;
  fetchCategories: () => Promise<void>
  searchProducts: (term: string) => Promise<void>;
  createCategory: (newCategory: newCategory) => Promise<void>
  fetchSupplierRuc: (ruc: string) => Promise<void>;
  createSupplier: (newSupplier: NewSupplier) => Promise<void>;
  fetchSuppliers: () => Promise<void>;

  clearSunatApi: () => void;
}

//me dio pereza terminar, queda implementar la logica del fetch de sunatApi

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  suppliers: [],
  supplierSunatApi: null,
  categories: [],
  isLoading: false,
  isLoadingCategory: false,
  isLoadingSupplier: false,
  isLoadingSupplierCreate: false,
  isLoadingSupplierSearch: false,
  isLoadingProduct: false,
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

  createProduct: async (product) => {
    set({ isLoadingProduct: true, error: null})
    try {
      const response = await api.post('/products', product);
      set((state) => ({
        products: [...state.products, response.data],
        isLoadingProduct: false
      }))
    } catch (error) {
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
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred in fetchCategories";
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
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred in createCategory";
      set({ error: errorMessage, isLoading: false});
    }
  },

  fetchSupplierRuc: async (ruc: string) => {
    set({ isLoadingSupplierSearch: true, error: null})

    try {
      const response = await api.get(`/suppliers/sunat/${ruc}`);
      set({ supplierSunatApi: response.data, isLoadingSupplierSearch: false})
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred in fetchSupplierRuc";
      set({ error: errorMessage, isLoading: false});
    }
  },

  fetchSuppliers: async () => {
    set({ isLoading: true, error: null})

    try {
      const response = await api.get('/suppliers')
      set({ suppliers: response.data, isLoading: false});
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred in fetchSuppliers";
      set({ error: errorMessage, isLoading: false});
    }
  },

  createSupplier: async (newSupplier) => {
    set({ isLoadingSupplierCreate: true, error: null})

    try {
      const response = await api.post('/suppliers', newSupplier);
      set((state) => ({
        suppliers: [...state.suppliers, response.data],
        isLoadingSupplierCreate: false
      }))
      
      toast.success('Proveedor creado exitosamente')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred in createSupplier";
      set({ error: errorMessage, isLoadingSupplierCreate: false});
    }
  },

  clearSunatApi: () => {
    set({ supplierSunatApi: null})
  },
}))
