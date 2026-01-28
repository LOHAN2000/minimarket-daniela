import { create } from "zustand";
import { Product } from "./useProductStore";

interface CartItem {
  id: number;
  name: string;
  sku: string;
  price: number;
  stock: number;
  category: string;
  color?: string;
  qty: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  updateQty: (id: number, delta: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],

  addToCart: (product) => {
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id ? { ...item, qty: item.qty + 1 } : item
          ),
        };
      } else {
        return {
          cart: [...state.cart, { ...product, qty: 1 }],
        };
      }
    });
  },

  updateQty: (id, delta) => {
    set((state) => ({
      cart: state.cart.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.qty + delta);
          return { ...item, qty: newQty };
        }
        return item;
      }),
    }));
  },

  removeItem: (id) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    }));
  },

  clearCart: () => {
    set({ cart: [] });
  }
}));
