"use client"
import { useAuthStore } from '@/store/useAuthStore';
import { ArrowRight, Eye, EyeOff, Loader2, Lock, Mail, ShoppingBasket, Store } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Toaster } from 'sonner';

export default function Login() {

  const { isLoading, login } = useAuthStore();
  
  const [showPassword, setShowPassword] = useState(false);
  const [ currentImage, setCurrentImage ] = useState(0);

  const router = useRouter();

  const [credentials, setCredentials] = useState({
      username: '',
      password: '',
  })


  const backgroundImages = [
    '/login/verduras.jpg',
    '/login/pasillo.jpg',
    '/login/seccion-congelados.jpg',
    '/login/cafe.jpg'
  ]

  
  const onSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      await login(credentials.username, credentials.password);

      router.push('/pos')
      
      setCredentials({username: '', password: ''});
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length)
    }, 6000)
    return () => clearInterval(timer);
  }, [backgroundImages.length])

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-slate-900">
      <Toaster />

      {/* ----------------------------------------------------------------------
          FONDO INMERSIVO (Cubre toda la pantalla)
          ---------------------------------------------------------------------- */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1800 ease-in-out ${
              currentImage === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={img}
              alt="Background"
              fill
              className="object-cover scale-105" // Ligero zoom para evitar bordes
              priority={index === 0}
            />
          </div>
        ))}
        {/* Overlay Oscuro para que la tarjeta resalte */}
        <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* ----------------------------------------------------------------------
          TARJETA CENTRAL (Floating Card)
          ---------------------------------------------------------------------- */}
      <div className="relative z-10 w-full max-w-md lg:max-w-lg p-6 sm:p-10 mx-4">
        
        {/* Efecto Glassmorphism / Tarjeta Blanca */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden relative">
          
          {/* Decoración superior (Barra Roja) */}
          <div className="h-2 w-full bg-linear-to-b from-red-600 via-red-500 to-red-400"></div>

          <div className="p-8 pt-10">
            {/* Header: Logo y Título */}
            <div className="flex flex-col items-center text-center mb-8 space-y-4">
              <div className="p-3 bg-red-50 rounded-2xl shadow-inner inline-flex">
                <ShoppingBasket className="w-8 h-8 text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Minimarket <span className="text-red-600">Daniela</span>
                </h2>
                <div className="flex items-center justify-center gap-2 mt-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <Store className="w-3 h-3" /> Acceso Administrativo
                </div>
              </div>
            </div>

            {/* Formulario */}
            <form onSubmit={onSubmit} className="space-y-5">
              
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1"> Usuario</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-red-500 transition-colors" />
                  </div>
                  <input
                    type="username"
                    name="username"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, [e.target.name]: e.target.value })}
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:bg-white transition-all duration-200 sm:text-sm font-medium"
                    placeholder="usuario"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Contraseña</label>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-red-500 transition-colors" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, [e.target.name]: e.target.value })}
                    className="block w-full pl-10 pr-10 py-3 border border-slate-200 rounded-xl leading-5 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:bg-white transition-all duration-200 sm:text-sm font-medium"
                    placeholder="••••••••"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-400 hover:text-red-500 focus:outline-none transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Opciones Extras */}
              <div className="flex items-center justify-end text-sm">
                <Link href="/forgot-password" className="text-red-600 font-bold hover:text-red-700 hover:underline transition-colors">
                  ¿Olvidaste la clave?
                </Link>
              </div>

              {/* Botón Principal */}
              <button
                type="submit"
                className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-red-500/30 text-sm font-bold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all transform hover:-translate-y-0.5 active:scale-95"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin h-5 w-5 text-white" />
                ) : (
                  <>
                    Ingresar al Sistema <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Footer de la tarjeta */}
            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
              <p className="text-sm text-slate-500">
                ¿No tienes credenciales?{' '}
                <Link href="/signUp" className="font-bold text-slate-900 hover:text-red-600 transition-colors">
                  Registrar Personal
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Info del Sistema (Fuera de la tarjeta) */}
        <div className="text-center mt-8 text-white/40 text-xs font-mono">
          <p>Secure Connection</p>
          <p className="mt-1">© 2026 Minimarket Daniela POS</p>
        </div>

      </div>
    </div>
  )
}
