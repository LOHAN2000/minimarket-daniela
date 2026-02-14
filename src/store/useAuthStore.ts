import api from "@/lib/api";
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  sub: string;
  unique_name: string;
  role: string;
  fullname?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()( persist((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  login: async (username, password) => {
    try {
      console.log("Intentando conectar a:", process.env.NEXT_PUBLIC_API_URL);
      const { data } = await api.post('/auth/login', { username, password });

      const decodedUser = jwtDecode<User>(data.token);

      set({ token: data.token, user: decodedUser, isAuthenticated: true});

    } catch (error) {
     console.log("Login falló", error)
     throw error; 
    }
  },
  setAuth: (token, user) => set({ token, user, isAuthenticated: true}),
  logout: () => set({ token: null, user: null, isAuthenticated: false})
}),
  {
    name: "auth-storage",
  }
));