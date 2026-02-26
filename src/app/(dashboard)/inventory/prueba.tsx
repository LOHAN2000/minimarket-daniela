import { useAuthStore } from '@/store/useAuthStore'
import { X, Box, Truck } from 'lucide-react'
import React from 'react'

export const AddProductModal = () => {
  const { user } = useAuthStore();

  // Función para manejar el envío real del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Guardando producto...");
    // Aquí irá tu lógica para guardar en la base de datos
  };

  return (
    <dialog id="modal_add_product" className='modal'>
      <div className='modal-box p-6 rounded-2xl max-w-md md:max-w-3xl w-full bg-white shadow-xl custom-scrollbar'>
        
        {/* BOTÓN CERRAR SUPERIOR */}
        <form method="dialog" className='absolute right-5 top-5'>
          <button className='text-gray-400 hover:text-red-600 transition-colors p-1 rounded-full hover:bg-red-50'>
            <X className='size-5'/>
          </button>
        </form>

        {/* TÍTULO PRINCIPAL */}
        <div className='mb-6 border-b border-gray-100 pb-4'>
          <h1 className='text-xl font-bold text-slate-800 flex items-center gap-2'>
            <Box className="text-red-600" size={24} />
            Agregar Nuevo Producto
          </h1>
          <p className="text-sm text-gray-500 mt-1">Completa los datos para registrar un artículo en el inventario.</p>
        </div>

        {/* FORMULARIO PRINCIPAL */}
        <form className='flex flex-col w-full space-y-6' onSubmit={handleSubmit}>
          
          {/* --- SECCIÓN 1: DATOS DEL PRODUCTO --- */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-red-600 tracking-wider uppercase">1. Datos del Producto</h2>
            
            <div className='flex sm:flex-row flex-col w-full gap-4'>
              <div className='w-full group'>
                <label className='text-sm font-semibold text-slate-700 tracking-wide mb-1.5 block'>Nombre del Producto <span className="text-red-500">*</span></label>
                <input type='text' placeholder="Ej. Leche Evaporada" required className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all'/>
              </div>
              <div className='w-full group'>
                <label className='text-sm font-semibold text-slate-700 tracking-wide mb-1.5 block'>Código de Barras</label>
                <input type='text' placeholder="Ej. 775123456789" className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all'/>
              </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 w-full'>
              <div className='flex-1 group'>
                <label className='text-sm font-semibold text-slate-700 tracking-wide mb-1.5 block'>Categoría <span className="text-red-500">*</span></label>
                <select className="select select-auto w-full px-3 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all" defaultValue="">
                  <option value="" disabled className="text-gray-400">Selecciona una categoría</option>
                  <option value="abarrotes">Abarrotes</option>
                  <option value="bebidas">Bebidas</option>
                  <option value="limpieza">Limpieza</option>
                  <option value="lacteos">Lácteos</option>
                </select>
              </div>
              
              <div className='flex flex-col group'>
                <label className='text-sm font-semibold text-slate-700 tracking-wide mb-1.5 block'>Crear Categoría Rápida</label>
                <div className='flex gap-x-2'>
                  <input placeholder="Nueva categoría" className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all'/>
                  <button type='button' disabled={user?.role !== 'admin'} className='px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50'>Crear</button>
                </div>
              </div>
            </div>

            <div className='flex flex-col sm:flex-row w-full gap-4'>
              <div className='w-full group'>
                <label className='text-sm font-semibold text-slate-700 tracking-wide mb-1.5 block'>Costo (S/)</label>
                <input type='number' step="0.01" placeholder="0.00" className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all'/>
              </div>
              <div className='w-full group'>
                <label className='text-sm font-semibold text-slate-700 tracking-wide mb-1.5 block'>Precio Venta (S/)</label>
                <input type='number' step="0.01" placeholder="0.00" className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all'/>
              </div>
              <div className='w-full group'>
                <label className='text-sm font-semibold text-slate-700 tracking-wide mb-1.5 block'>Stock Inicial</label>
                <input type='number' placeholder="0" className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all'/>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* --- SECCIÓN 2: DATOS DEL PROVEEDOR --- */}
          <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <h2 className="text-sm font-bold text-slate-800 tracking-wider uppercase flex items-center gap-2">
              <Truck size={16} className="text-slate-500"/> 
              2. Asignar Proveedor
            </h2>
            
            <div className='flex flex-col sm:flex-row w-full gap-4'>
              <div className='flex-1 group'>
                <label className='text-sm font-semibold text-slate-700 tracking-wide mb-1.5 block'>Proveedor Existente</label>
                <select className="select select-auto w-full px-3 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all" defaultValue="">
                  <option value="" disabled className="text-gray-400">Selecciona un proveedor</option>
                  <option value="1">Distribuidora del Centro</option>
                  <option value="2">Macro</option>
                </select>
              </div>
              <div className='flex flex-col group'>
                <label className='text-sm font-semibold text-slate-700 tracking-wide mb-1.5 block'>RUC de Proveedor Nuevo</label>
                <div className='flex gap-x-2'>
                  <input placeholder="Ej. 20123456789" className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all bg-white'/>
                  <button type='button' disabled={user?.role !== 'admin'} className='px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50'>Buscar</button>
                </div>
              </div> 
            </div>

            {/* Campos de proveedor en grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
              <div className='col-span-1 sm:col-span-2 lg:col-span-3'>
                <label className='text-sm font-semibold text-slate-700 tracking-wide mb-1.5 block'>Razón Social</label>
                <input type='text' disabled className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-500'/>
              </div>
              <div>
                <label className='text-sm font-semibold text-slate-700 tracking-wide mb-1.5 block'>Dirección</label>
                <input type='text' disabled className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-500'/>
              </div>
              <div>
                <label className='text-sm font-semibold text-slate-700 tracking-wide mb-1.5 block'>Distrito</label>
                <input type='text' disabled className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-500'/>
              </div>
              <div>
                <label className='text-sm font-semibold text-slate-700 tracking-wide mb-1.5 block'>Condición</label>
                <input type='text' disabled className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-500'/>
              </div>
            </div>
            <div className='flex justify-end pt-2'>
                <button type='button' disabled={user?.role !== 'admin'} className='flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 shadow-sm'>Agregar Proveedor</button>
            </div>
          </div>

          {/* --- BOTONES DE ACCIÓN FINALES --- */}
          <div className="flex justify-end pt-4 mt-6 border-t border-gray-100 space-x-3">
            <form method="dialog" className="">
              <button className='flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors'>Cancel</button>
            </form>
            <button type='submit' disabled={user?.role !== 'admin'} className='flex items-center gap-2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-bold transition-all shadow-md shadow-red-600/20 disabled:opacity-50 disabled:cursor-not-allowed'>Guardar Producto</button>
          </div>
        </form>
      </div>

      {/* BACKDROP PARA CERRAR AL HACER CLIC AFUERA */}
      <form method="dialog" className="modal-backdrop bg-slate-900/20 backdrop-blur-sm">
        <button>Cerrar</button>
      </form>
    </dialog>
  )
}