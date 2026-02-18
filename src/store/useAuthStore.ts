import api from "@/lib/api";
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { newUser, User } from "../../types";
import { toast } from "sonner";

interface AuthState {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  registerUser: (newUser: newUser) => Promise<void>;
}

export const useAuthStore = create<AuthState>()( persist((set) => ({
  token: null,
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  login: async (username, password) => {
    set({ isLoading: true, error: null }); // Empezamos carga
    try {
      const { data } = await api.post('/auth/login', { username, password });
      const decodedUser = jwtDecode<User>(data.token);
      
      set({ token: data.token, user: decodedUser, isAuthenticated: true, isLoading: false });
    } catch (error: unknown) {
      console.log("Login falló", error);
      set({ isLoading: false, error: "Credenciales incorrectas o error de conexión." });
      throw error;
    }
  },
  registerUser: async (newUser) => {
    set({ isLoading: true, error: null});
    try {
      const response = await api.post('/auth/register', newUser);
      set({ isLoading: false});
      toast.success(response.data.message)
    } catch (error: any) {
      set({  isLoading: false})
      const errorMessage = error.response?.data?.error || error.response?.data?.message || "Error de conexión con el servidor";
      set({ error: errorMessage });
      toast.error(errorMessage);
    }
  },

  setAuth: (token, user) => set({ token, user, isAuthenticated: true}),
  logout: () => set({ token: null, user: null, isAuthenticated: false})
}),
  {
    name: "auth-storage",
    partialize: (state) => ({
      token: state.token,
      user: state.user,
      isAuthenticated: state.isAuthenticated
    }),
  }
));