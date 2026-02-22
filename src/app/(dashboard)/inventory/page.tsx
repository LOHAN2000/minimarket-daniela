"use client"
import { Header } from '@/components/Header';
import { useProductStore } from '@/store/useProductStore';
import { ListFilter, PenLineIcon, Plus, Search, SlidersHorizontal } from 'lucide-react';
import React, { useEffect, useState } from 'react'

export default function Inventory() {

  const { products, fetchProducts, isLoading } = useProductStore();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [])
  
  const filteredProducts = products.filter((producto) =>
    producto.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='w-full h-full flex flex-col p-4 overflow-hidden bg-slate-50'>
      <Header name='Inventario'/>
      
      {/* EL TRUCO: flex-wrap permite que si el sidebar empuja los elementos 
        y ya no caben, salten a la siguiente línea suavemente. 
      */}
      <div className='mt-5 mb-6 flex flex-wrap justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200'>
        
        {/* BUSCADOR FLUIDO: flex-1 le dice que crezca para rellenar, 
          min-w-[250px] evita que se aplaste demasiado, 
          max-w-md (opcional) evita que se estire a lo loco en pantallas gigantes. 
        */}
        <div className='relative flex-1 min-w-[250px] max-w-lg'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <Search className="text-gray-400" size={18} />
          </div>
          <input 
            type='text' 
            placeholder='Buscar productos...' 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300'
          />
        </div>

        {/* CONTENEDOR DE BOTONES FLUIDO */}
        <div className='flex flex-wrap items-center gap-3'>
          <button className='flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors'>
            <SlidersHorizontal size={17}/>
            <span className='hidden sm:block'>Ordenar</span>
          </button>
          <button className='flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors'>
            <ListFilter size={17}/>
            <span className='hidden sm:block'>Filtrar</span>
          </button>
          <button className='flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm shadow-red-600/20'>
            <Plus size={20}/>
            <span className='hidden sm:block'>Agregar Producto</span>
          </button>
        </div>
      </div>

    </div>
  )
}