"use client"
import { ArrowRightIcon, BadgeCheck, Eye, EyeOff, Fingerprint, LockIcon, Mail, ShieldCheck, ShoppingBasket, Store, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Login() {

  const [ showPassword, setShowPassword ] = useState(false);
  const [ currentImage, setCurrentImage ] = useState(0);

  const backgroundImages = [
    '/login/verduras.jpg',
    '/login/pasillo.jpg',
    '/login/seccion-congelados.jpg',
    '/login/cafe.jpg'
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length)
    }, 5000)
    return () => {
      clearInterval(timer)
    }
  }, [])


  return (
    <div className='flex flex-row w-full h-full'>
      <div className='flex flex-col py-15 px-10 lg:w-1/2 bg-white justify-between '>
        <nav className='flex justify-between items-center'>
          <div className='flex justify-center items-center space-x-2'>
            <div className='p-2 bg-red-500 text-white rounded-xl shadow-lg shadow-red-500/20 justify-center items-center w-12 h-12 flex'>
              <ShoppingBasket className="w-7 h-7"/>
            </div>
            <div className='flex items-center space-x-1'>
              <span className='text-2xl font-bold tracking-tight text-slate-900'>Minimarket</span>
              <span className='text-2xl font-bold tracking-tight text-red-500'>Daniela</span>
            </div>
          </div>
          <div className='hidden sm:flex text-slate-400 text-sm font-bold items-center justify-center tracking-widest gap-1 uppercase border border-slate-200 px-3 py-1 rounded-full bg-slate-50'>
            <Store className="w-5 h-5" /> Punto de Venta
          </div>
        </nav>
        <div className='flex flex-col w-full max-w-xl items-center justify-center mx-auto'>
          <div className='flex flex-col space-y-2 mb-4'>
            <h1 className='font-extrabold text-4xl text-slate-900 tracking-tight'>Registro de Personal</h1>
            <span className='text-slate-400'>Complete los datos del trabajador para generar sus credenciales de acceso al terminal POS.</span>
          </div>

          <form className='flex flex-col w-full gap-y-5'>
            <div className='flex flex-col md:flex-row w-full gap-x-4'>
              <div className='w-1/2 group'>
                <label className='text-sm font-bold text-slate-600 uppercase tracking-wide mb-1.5 ml-1'>Nombre</label>
                <div className='relative mt-1'>
                  <User className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-red-600 transition-colors'/>
                  <input type='text' placeholder='Nombre del Personal' className='w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg p-3 pl-9 focus:ring-2 focus:ring-red-100 focus:border-red-500 block outline-none font-medium placeholder:text-slate-400 transition-all'/>
                </div>
              </div>
              <div className='w-1/2 group'>
                <label className='text-sm font-bold text-slate-600 uppercase tracking-wide mb-1.5 ml-1'>Apellidos</label>
                <div className='relative mt-1'>
                  <User className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-red-600 transition-colors'/>
                  <input type='text' placeholder='Apellidos del Personal' className='w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg p-3 pl-9 focus:ring-2 focus:ring-red-100 focus:border-red-500 block outline-none font-medium placeholder:text-slate-400 transition-all'/>
                </div>
              </div>
            </div>
            <div className='flex flex-row'>
              <div className='flex flex-col w-full group'>
                <label className='text-sm font-bold text-slate-600 uppercase tracking-wide mb-1.5 ml-1'>usuario de sistema</label>
                <div className='relative mt-1'>
                  <Fingerprint className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-red-600 transition-colors'/>
                  <input type='text' placeholder='Cajero_1' className='w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg p-3 pl-9 focus:ring-2 focus:ring-red-100 focus:border-red-500 block outline-none font-medium placeholder:text-slate-400 transition-all'/>
                </div>
              </div>
            </div>
            <div className='flex flex-row'>
              <div className='flex flex-col w-full group'>
                <label className='text-sm font-bold text-slate-600 uppercase tracking-wide mb-1.5 ml-1'>Correo Electronico</label>
                <div className='relative mt-1'>
                  <Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-red-600 transition-colors'/>
                  <input type='text' placeholder='example@example.com' className='w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg p-3 pl-9 focus:ring-2 focus:ring-red-100 focus:border-red-500 block outline-none font-medium placeholder:text-slate-400 transition-all'/>
                </div>
              </div>
            </div>
            <div className='flex flex-row'>
              <div className='flex flex-col w-full group'>
                <label className='text-sm font-bold text-slate-600 uppercase tracking-wide mb-1.5 ml-1'>Contraseña</label>
                <div className='relative mt-1'>
                  <LockIcon className='absolute left-3 top-3/6 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-red-600 transition-colors'/>
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5'>{showPassword ? <EyeOff/> : <Eye className=''/>}</button>
                  <input type={showPassword ? 'text' : 'password'} placeholder='••••••••••••' className='w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg p-3 pl-9 focus:ring-2 focus:ring-red-100 focus:border-red-500 block outline-none font-medium placeholder:text-slate-400 transition-all'/>
                </div>
              </div>
            </div>
            <div className='flex flex-col'>
              <div className='flex flex-col w-full group'>
                <label className='text-sm font-bold text-slate-600 uppercase tracking-wide mb-1.5 ml-1'>Rol asignado</label>
                <div className='relative mt-1'>
                  <ShieldCheck className='absolute left-3 top-3/6 -translate-y-1/2 w-5 h-5 text-red-500 transition-colors'/>
                  <BadgeCheck className='absolute right-3 top-1/2 -translate-y-1/2 text-red-500 w-5 h-5'/>
                  <input placeholder='cajero - punto de venta' readOnly className='w-full bg-red-100 border border-red-200 rounded-lg p-3 pl-9 cursor-not-allowed select-none focus:outline-none placeholder:text-red-600 placeholder:uppercase placeholder:text-sm placeholder:font-bold transition-all'/>
                </div>
              </div>
              <span className='text-sm text-slate-400 mt-1 ml-1'>* El registro externo está limitado exclusivamente al perfil de cajeros.</span>
            </div>
            <button type='button' className='flex justify-center items-center text-white bg-red-500 py-4 rounded-2xl w-full uppercase font-bold shadow-lg shadow-red-500/30 hover:shadow-red-500/40 transition-all transform hover:-translate-y-0.5 cursor-pointer'>
              <span className='flex justify-center items-center'>Registrar Cajero<ArrowRightIcon className='w-5 h-5 mt-0.5 ms-1'/></span>
            </button>
            <div className='flex justify-center text-sm text-slate-400'>
              <span>¿Problemas con el registro?<span className='text-red-500 font-bold ms-2 cursor-pointer'>Contactar Soporte IT</span></span>
            </div>
          </form>
        </div>
        <div className='flex w-full justify-between'>
          <span className='text-sm text-slate-400'>© 2026 Minimarket Daniela.</span>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
            <span className='text-sm text-slate-400 ms-1'>System Online</span>
          </div>
        </div>
      </div>

      <div className='hidden lg:block lg:w-1/2 relative bg-slate-900 overflow-hidden'>
        {backgroundImages.map((img, index) => (
          <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentImage === index ? 'opacity-100' : 'opacity-0'}`}>
            <Image
              src={img}
              alt='Minimarket Daniela'
              fill
              className={`object-cover transition-transform duration-[7000ms] ease-in-out ${currentImage === index ? 'scale-110' : 'scale-105'}`}/>
          </div>
        ))}
        <div className='absolute inset-0 bg-red-500/10 mix-blend-multiply z-10'></div>
        <div className='absolute inset-0 bg-linear-to-t from-slate-950 via-slate-900/40 to-transparent z-10'></div>

        <div className='absolute inset-0 flex flex-col justify-end items-start z-40 ms-24 space-y-20 mb-6'>
          <div className='space-y-3 max-w-2xl'>
            <div className='bg-red-500 w-fit text-white text-xs px-3 py-1 rounded-full tracking-wider mb-2 uppercase font-bold'>
              <span>INTERNAL USE ONLY</span>
            </div>
            <div className='flex flex-col text-6xl font-bold'>
              <span className='text-white'>Gestión Integral</span>
              <span className='text-red-400'>De Inventario.</span>
            </div>
            <span className='text-slate-400 leading-relaxed font-light opacity-90 text-lg'>Plataforma optimizada para el control de flujo de caja, rotación de productos y punto de venta.</span>
          </div>
          <div className='flex gap-2'>
            {backgroundImages.map((img, index) => (
              <button key={index} onClick={() => setCurrentImage(index)} className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${currentImage === index ? 'w-8 bg-red-400' : 'w-2 bg-white/30'}`}></button>
            ))}
          </div>
        </div>
      </div>

      
    </div>
  )
}
//TODO: Crear modal para "Contactar Soporte TI"