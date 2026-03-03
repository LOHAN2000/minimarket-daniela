"use client"
import { Header } from '@/components/Header';
import { AddProductModal } from '@/components/inventory/AddProductModal';
import { useProductStore } from '@/store/useProductStore';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ListFilter, PenLine, Plus, Search, SlidersHorizontal, Trash2 } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Toaster } from 'sonner';

export default function Inventory() {

  const { products, fetchProducts, isLoading } = useProductStore();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const filteredProducts = products.filter((producto) =>
    producto.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusConfig = (stock: number) => {
    if (stock === 0) return { text: "Out of stock", bg: "bg-red-50", textCol: "text-red-600", dot: "bg-red-500" };
    if (stock < 20) return { text: "Low Stock", bg: "bg-orange-50", textCol: "text-orange-600", dot: "bg-orange-500" };
    return { text: "In Stock", bg: "bg-green-50", textCol: "text-green-600", dot: "bg-green-500" };
  };

  return (
    <div className='w-full h-full flex flex-col p-4 overflow-hidden bg-slate-50'>
      <Toaster/>
      <Header name='Inventario'/>
      
      {/* EL TRUCO: flex-wrap permite que si el sidebar empuja los elementos 
        y ya no caben, salten a la siguiente línea suavemente. 
      */}
      <div className='mt-5 mb-6 flex flex-wrap justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200'>
        
        {/* BUSCADOR FLUIDO: flex-1 le dice que crezca para rellenar, 
          min-w-[250px] evita que se aplaste demasiado, 
          max-w-md (opcional) evita que se estire a lo loco en pantallas gigantes. 
        */}
        <div className='relative flex-1 min-w-62.5 max-w-lg'>
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
          <button onClick={() => {const modal = document.getElementById('modal_add_product') as HTMLDialogElement | null; modal?.showModal();}} className='flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm shadow-red-600/20'>
            <Plus size={20}/>
            <span className='hidden sm:block'>Agregar Producto</span>
          </button>
        </div>
      </div>

      <div className='bg-white shadow-sm rounded-xl border border-gray-200 flex flex-col flex-1'>
        <div className='overflow-x-auto'>
          <table className='w-full text-left border-collapse whitespace-nowrap'>
            <thead className='text-gray-500 text-xs font-semibold uppercase border-b border-gray-200'>
              <tr>
                <th className='px-6 py-4'>Product</th>
                <th className='px-6 py-4'>Category</th>
                <th className='px-6 py-4'>Status</th>
                <th className='px-6 py-4'>Stock</th>
                <th className='px-6 py-4'>Price</th>
                <th className='px-6 py-4 text-center'>Action</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {filteredProducts.map((producto) => {
                const status = getStatusConfig(producto.stock);
                return (
                  <tr key={producto.id} className='hover:bg-red-50/50 transition-colors duration-200 group'>
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-3'>
                        <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 shrink-0 overflow-hidden">
                          <Image unoptimized src={`https://ui-avatars.com/api/?name=${producto.name}&background=f3f4f6&color=ef4444`} alt={producto.name} width={110} height={110} className="w-full h-full object-cover" />
                        </div>
                        <span className='font-semibold text-gray-800 text-sm'>{producto.name}</span>
                      </div>
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-600 font-medium'>
                      {producto.category?.name || "General"}
                    </td>
                    <td className='px-6 py-4'>
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${status.bg} ${status.textCol}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`}></span>
                        {status.text}
                      </div>                      
                    </td>
                     <td className='px-8 py-4 text-sm text-gray-600 font-medium'>
                      {producto.stock}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-800 font-semibold'>
                      S/ {producto.price.toFixed(2)}
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center justify-center gap-3'>
                        <button className='text-gray-400 hover:text-red-600 transition-colors' title="Eliminar">
                          <Trash2 size={18} />
                        </button>
                        <button className='text-gray-400 hover:text-blue-600 transition-colors' title="Editar">
                          <PenLine size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {filteredProducts.length === 0 && !isLoading && (
            <div className="p-12 text-center text-gray-500 flex flex-col items-center">
              <Search className="w-12 h-12 mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900">No se encontraron productos</h3>
              <p>No hay resultados que coincidan con &quot;{searchTerm}&quot;</p>
            </div>
          )}
        </div>
        <div className='mt-auto border-t border-gray-200 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4'>
          <div className='flex items-center gap-2 text-sm text-gray-500'>
            <span>Show</span>
            <select className='border border-gray-200 rounded-md py-1 px-2 focus:outline-none focus:border-red-500 bg-white'>
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
            <span>per page</span>
          </div>

          <div className='flex items-center gap-1'>
            <button className='p-1 text-gray-400 hover:text-red-600 disabled:opacity-50'><ChevronsLeft size={18}/></button>
            <button className='p-1 text-gray-400 hover:text-red-600 disabled:opacity-50 mr-2'><ChevronLeft size={18}/></button>
            
            <button className='w-8 h-8 flex items-center justify-center rounded-md bg-red-50 text-red-600 font-semibold text-sm'>1</button>
            <button className='w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-50 text-gray-600 font-medium text-sm'>2</button>
            <button className='w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-50 text-gray-600 font-medium text-sm'>3</button>
            <span className='px-1 text-gray-400'>...</span>
            <button className='w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-50 text-gray-600 font-medium text-sm'>8</button>
            
            <button className='p-1 text-gray-400 hover:text-red-600 disabled:opacity-50 ml-2'><ChevronRight size={18}/></button>
            <button className='p-1 text-gray-400 hover:text-red-600 disabled:opacity-50'><ChevronsRight size={18}/></button>
          </div>
        </div>
      </div>

      {/*MODAL*/}
      <AddProductModal/>
    </div>
  )
}