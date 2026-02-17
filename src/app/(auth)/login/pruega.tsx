"use client"
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, ArrowRight, Mail, User, Lock, ShoppingBasket, ShieldCheck, BadgeCheck, Fingerprint, Store } from 'lucide-react';

export default function RegisterMarketAdmin() {
  const [showPassword, setShowPassword] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  // Imágenes rotativas
  const backgroundImages = [
    "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=1974&auto=format&fit=crop", // Supermarket Aisle
    "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2070&auto=format&fit=crop"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen w-full flex bg-white font-sans selection:bg-red-100 selection:text-red-900">
      
      {/* -----------------------------------------------------------------------
          IZQUIERDA: FORMULARIO (Inputs ajustados al JSON)
          ----------------------------------------------------------------------- */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 md:p-12 lg:p-14 relative z-20 bg-white">
        
        {/* Fondo decorativo sutil (Grid Pattern) */}
        <div className="absolute inset-0 z-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#cc0000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        </div>

        {/* Header */}
        <nav className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-lg shadow-lg shadow-red-600/20 flex items-center justify-center text-white">
              <ShoppingBasket className="w-6 h-6" />
            </div>
            <span className="font-bold text-2xl text-slate-900 tracking-tight flex items-center gap-1">
              Fresko<span className="text-red-600">Admin</span>
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest border border-slate-200 px-3 py-1 rounded-full">
            <Store className="w-3 h-3" /> Punto de Venta
          </div>
        </nav>

        {/* Main Content */}
        <main className="w-full max-w-lg mx-auto mt-8 relative z-10">
          <div className="mb-6">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
              Alta de Personal
            </h1>
            <p className="text-slate-500 text-sm">
              Complete los datos del colaborador para generar sus credenciales de acceso al terminal POS.
            </p>
          </div>

          <form className="space-y-4">
            
            {/* ROW 1: Name & LastName */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full group">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 ml-1">Nombre</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-red-600 transition-colors" />
                  <input 
                    name="name"
                    type="text" 
                    placeholder="Ej. Roberto" 
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-red-100 focus:border-red-500 block pl-10 p-3 transition-all outline-none font-medium placeholder:text-slate-400"
                  />
                </div>
              </div>
              <div className="w-full group">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 ml-1">Apellidos</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-red-600 transition-colors" />
                  <input 
                    name="lastName"
                    type="text" 
                    placeholder="Ej. Gomez Diaz" 
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-red-100 focus:border-red-500 block pl-10 p-3 transition-all outline-none font-medium placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* ROW 2: Username */}
            <div className="group">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 ml-1">Usuario de Sistema</label>
              <div className="relative">
                <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-red-600 transition-colors" />
                <input 
                  name="username"
                  type="text" 
                  placeholder="Ej. rgomez_caja1" 
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-red-100 focus:border-red-500 block pl-10 p-3 transition-all outline-none font-medium placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* ROW 3: Email */}
            <div className="group">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 ml-1">Correo Electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-red-600 transition-colors" />
                <input 
                  name="email"
                  type="email" 
                  placeholder="roberto@freskomarket.com" 
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-red-100 focus:border-red-500 block pl-10 p-3 transition-all outline-none font-medium placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* ROW 4: Password */}
            <div className="group">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 ml-1">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-red-600 transition-colors" />
                <input 
                  name="password"
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••••••"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-red-100 focus:border-red-500 block pl-10 p-3 pr-10 transition-all outline-none font-medium placeholder:text-slate-400"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* ROW 5: Role (Locked) */}
            <div className="group">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 ml-1">Rol Asignado</label>
              <div className="relative opacity-70">
                <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-600" />
                <input 
                  name="role"
                  type="text" 
                  value="CAJERO - PUNTO DE VENTA" 
                  readOnly
                  className="w-full bg-red-50 border border-red-100 text-red-800 text-sm font-bold rounded-lg block pl-10 p-3 cursor-not-allowed select-none focus:outline-none"
                />
                <BadgeCheck className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-600" />
              </div>
              <p className="text-[10px] text-slate-400 mt-1 ml-1">
                * El registro externo está limitado exclusivamente al perfil de cajeros.
              </p>
            </div>

            {/* Button */}
            <button type="button" className="w-full mt-4 group bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-6 rounded-lg shadow-lg shadow-red-600/30 hover:shadow-red-600/40 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-base">
              Registrar Cajero
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="text-center pt-2">
               <p className="text-slate-500 text-xs">
                 ¿Problemas con el registro? <a href="#" className="text-red-600 font-bold hover:underline">Contactar Soporte IT</a>
               </p>
            </div>
          </form>
        </main>

        <footer className="mt-8 relative z-10 text-slate-400 text-[10px] flex justify-between items-center border-t border-slate-100 pt-4">
          <p>© 2024 Fresko Market Inc.</p>
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
             <span>System Online</span>
          </div>
        </footer>
      </div>

      {/* -----------------------------------------------------------------------
          DERECHA: DASHBOARD VISUAL
          ----------------------------------------------------------------------- */}
        <div className="hidden lg:block lg:w-1/2 relative bg-slate-900 overflow-hidden">
        
        {/* Imágenes */}
        {backgroundImages.map((img, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentImage === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={img} 
              alt="Market Admin" 
              className="w-full h-full object-cover transform scale-105" 
            />
          </div>
        ))}

        {/* Gradientes Fresko Brand */}
        {/* Capa Roja oscura multiplicar para dar identidad de marca sobre la foto */}
        <div className="absolute inset-0 bg-red-900/40 mix-blend-multiply z-10"></div>
        {/* Degradado oscuro desde abajo para texto legible */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent z-10"></div>

        {/* Elemento Decorativo: Tarjeta Glassmorphism */}
        <div className="absolute top-10 right-10 z-20">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl flex items-center gap-4 shadow-2xl">
                <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-xs">FM</div>
                <div>
                    <p className="text-white text-xs font-bold">Admin Console</p>
                    <p className="text-red-200 text-[10px]">Secure Connection</p>
                </div>
            </div>
        </div>

        {/* Contenido Texto */}
        <div className="absolute inset-0 flex flex-col justify-end p-20 z-20 pb-24">
           <div className="space-y-4 max-w-lg">
             <div className="inline-block bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-wider mb-2">
                INTERNAL USE ONLY
             </div>
             
             <h2 className="text-5xl font-bold text-white leading-none tracking-tight">
               Gestión Integral <br/>
               <span className="text-red-400">de Inventario.</span>
             </h2>
             
             <p className="text-slate-200 text-lg opacity-90 leading-relaxed font-light">
               Plataforma optimizada para el control de flujo de caja, rotación de productos frescos y administración de personal.
             </p>
           </div>
        </div>

        {/* Indicadores */}
        <div className="absolute bottom-10 left-20 z-30 flex gap-2">
          {backgroundImages.map((_, index) => (
            <button 
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentImage === index ? 'w-8 bg-red-500' : 'w-2 bg-white/30'
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}