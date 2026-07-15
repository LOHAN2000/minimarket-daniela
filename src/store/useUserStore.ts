import { create } from "zustand";
import { newUser, UpdateUser, User } from "../../types";
import api from "@/lib/api";
import { AxiosError } from "axios";

interface UserState {
  users: User[];
  isLoadingUsers: boolean;
  isLoadingUpdateUser: boolean;
  isLoadingDeleteUser: boolean;
  isLoadingCreateUser: boolean;
  isLoadingUser: boolean;
  error: string | null; 

  fetchUsers: () => Promise<void>;
  createUser: (data: newUser) => Promise<{ success: boolean; data?: User; error?: string }>;
  updateUser: (id: number, data: UpdateUser) => Promise<{ success: boolean; data?: User; error?: string }>
  deleteUser: (id: number) => Promise<{ success: boolean; data?: User; error?: string }>
}

export const userUserStore = create<UserState>((set) => ({
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
      const response = await api.get('/users');
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
      const response = await api.post('/users', data);
      set((state) => ({
        users: [...state.users, response.data],
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
      const response = await api.put(`/users/${id}`, data);
      set((state) => ({
        users: state.users.map((user) => user.nameid === id ? { ...user, ...data} : user),
        isLoadingUpdateUser: false
      }));
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
      const response = await api.delete(`/users/${id}`)
      set((state) => ({
        users: state.users.filter((user) => user.nameid !== id),
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

// Que flojeraaaaaaaaaaaaaaaaaaa