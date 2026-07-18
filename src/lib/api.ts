import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Interceptor de peticiones: Agrega el token si existe
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
})

// Interceptor de respuestas: Maneja errores
api.interceptors.response.use(
  (response) => response, 
  (error) => {
    // 1. CAMBIO IMPORTANTE: Usamos '?.' (Optional Chaining) para evitar crasheos si no hay respuesta del servidor
    if (error.response?.status === 401) {
      console.warn("Token expirado o no autorizado. Cerrando sesión...");

      useAuthStore.getState().logout();
      return Promise.reject(error);
    }
    
    // Devolvemos el error para que el bloque catch de Zustand lo maneje
    return Promise.reject(error);
  }
)

export default api;