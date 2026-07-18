import { create } from "zustand";
import { User } from "../../types";
import api from "@/lib/api";
import { AxiosError } from "axios";

interface UserState {
  editingUser: User | null;
  users: User[];
  isLoadingUsers: boolean;
  isLoadingUpdateUser: boolean;
  isLoadingDeleteUser: boolean;
  isLoadingCreateUser: boolean;
  isLoadingUser: boolean;
  error: string | null; 

  fetchUsers: () => Promise<void>;
  getUserById: (id: number) => Promise<{ success: boolean; data?: User; error?: string }>;
  createUser: (data: User) => Promise<{ success: boolean; data?: User; error?: string }>;
  updateUser: (id: number, data: User) => Promise<{ success: boolean; data?: User; error?: string }>
  deleteUser: (id: number) => Promise<{ success: boolean; data?: User; error?: string }>
}

export const useUserStore = create<UserState>((set) => ({
  editingUser: null,
  users: [],
  isLoadingUsers: false,
  isLoadingUpdateUser: false,
  isLoadingUser: false,
  isLoadingCreateUser: false,
  isLoadingDeleteUser: false,
  error: null,

  fetchUsers: async () => {
    set({ isLoadingUsers: true, error: null});
    try {
      const response = await api.get('/auth/users');
      set({ users: response.data, isLoadingUsers: false});
    } catch (error) {
      const err = error as AxiosError;
      const errorMessage = err.response?.data as string || "Error al cargar usuarios.";
      set({ error: errorMessage, isLoadingUsers: false});
    }
  },

  createUser: async (data) => {
    set({ isLoadingCreateUser: true, error: null })
    try {
      const response = await api.post('/auth/register', data);
      set((state) => ({
        users: [...state.users, response.data.user],
        isLoadingCreateUser: false
      }))
      return { success: true, data: response.data };
    } catch (error) {
      const err = error as AxiosError;
      const errorMessage = err.response?.data as string || "Error al crear usuario.";
      return { success: false, error: errorMessage };
    }
  },

  updateUser: async (id, data) => {
    set({ isLoadingUpdateUser: true, error: null });
    try {
      const response = await api.put(`/auth/users/${id}`, data);
      set((state) => ({
        users: state.users.map((user) => user.id === id ? { ...user, ...response.data.userUpdated} : user),
        isLoadingUpdateUser: false
      }));
      return { success: true, data: response.data };
    } catch (error) {
      const err = error as AxiosError;
      const errorMessage = err.response?.data as string || "Error al editar usuario.";
      return { success: false, error: errorMessage };
    }
  },

  getUserById: async (id) => {
    set({ isLoadingUser: true, error: null });
    try {
      const response = await api.get(`/auth/users/${id}`);
      set({ editingUser: response.data, isLoadingUser: false});
      return { success: true, data: response.data };
    } catch (error) {
      const err = error as AxiosError;
      const errorMessage = err.response?.data as string || "Error al editar usuario.";
      return { success: false, error: errorMessage };
    }
  },

  deleteUser: async (id) => {
    set({ isLoadingDeleteUser: true, error: null });
    try {
      const response = await api.delete(`/auth/users/${id}`)
      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
        isLoadingDeleteUser: false
      }))
      return { success: true, data: response.data }
    }
    catch (error) {
      const err = error as AxiosError;
      const errorMessage = err.response?.data as string || "Error al elimninar usuario.";
      return { success: false, error: errorMessage };
    }
  }
}))