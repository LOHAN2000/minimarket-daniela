import api from "@/lib/api";
import { create } from "zustand";
import { Category, newCategory, newProduct, NewSupplier, Product, StoreResult, Supplier, SupplierApi, UpdateProduct } from "../../types";
import { toast } from "sonner";
import { AxiosError } from "axios";

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
  isLoadingDeleteProduct: boolean;
  isLoadingUpdateProduct: boolean;
  isLoadingProduct: boolean;
  error: string | null;

  fetchProducts: () => Promise<void>;
  createProduct: (product: newProduct) => StoreResult<Product>;
  updateProduct: (id: number, product: UpdateProduct) => StoreResult<Product>;
  deleteProduct: (id: number) => StoreResult<Product>;

  fetchCategories: () => Promise<void>
  createCategory: (newCategory: newCategory) => Promise<void>;

  searchProducts: (term: string) => Promise<void>;
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
  isLoadingDeleteProduct: false,
  isLoadingUpdateProduct: false,
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
      return { success: true, data: response.data };

    } catch (error) {
      const err = error as AxiosError;
      const errorMessage = err.response?.data as string || "An unknown error occurred";
      set({ error: errorMessage, isLoadingProduct: false})
      return { success: false, error: errorMessage };
    }
  },

  updateProduct: async (id, product) => {
    set({ isLoadingUpdateProduct: true, error: null })
    
    try {
      const response = await api.put(`/products/${id}`, product);
      set((state) => ({
        products: state.products.map((p) => p.id === id ? response.data : p),
        isLoadingUpdateProduct: false
      }));
      return { success: true, data: response.data }  

    } catch (error) {
      const err = error as AxiosError;;
      const errorMessage = err.response?.data as string || "An unknow error ocurred in updateProduct";
      set({ error: errorMessage, isLoadingUpdateProduct: false })
      return { success: false, error: errorMessage };
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

  deleteProduct: async (id) => {
    set({ isLoadingDeleteProduct: true, error: null})

    try {
      const response = await api.delete(`/products/${id}`)
      set((state) => ({
        products: state.products.filter((product) => product.id !== id),
        isLoadingDeleteProduct: false
      }))

      return { success: true, data: response.data };
    } catch (error) {
      const err = error as AxiosError;
      const errorMessage = err.response?.data as string || "An unknown error occurred";
      set({ error: errorMessage, isLoadingDeleteProduct: false})
      return { success: false, error: errorMessage };
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
