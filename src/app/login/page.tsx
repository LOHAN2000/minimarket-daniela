'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore'; // Solo importamos el store

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  
  // Traemos la acción login del store
  const {login} = useAuthStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // ✅ La UI solo dice: "Intenta loguearte con esto"
      await login(username, password);
      
      // Si no hubo error, redirigimos
      router.push('/pos');
    } catch (err) {
      // Si el store lanzó error, lo mostramos
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Minimarket Daniela</h2>
        
        {error && <div className="mb-4 p-2 bg-red-100 text-red-600 rounded text-sm text-center">{error}</div>}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-medium">Usuario</label>
          <input 
            type="text" 
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: admin"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">Contraseña</label>
          <input 
            type="password" 
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white font-bold p-3 rounded hover:bg-blue-700 transition duration-200"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}