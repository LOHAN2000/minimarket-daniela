/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client"
import { Header } from '@/components/Header';
import { AddProductModal } from '@/components/inventory/AddProductModal';
import { DeleteProductModal } from '@/components/inventory/DeleteProductModal';
import { useProductStore } from '@/store/useProductStore';
import { ChevronLeft, ChevronRight, ListFilter, PenLine, Plus, Search, SlidersHorizontal, Trash2, X } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react'
import { Toaster } from 'sonner';
import { Product } from '../../../../types';
import { EditProductModal } from '@/components/inventory/EditProductModal';
import { TableRowSkeleton } from '@/components/skeletons/TableRowSkeleton';

export default function Inventory() {

  const { products, fetchProducts, isLoadingProducts } = useProductStore();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [ isDeleteOpen, setIsDeleteOpen ] = useState(false);
  const [ productToDelete, setProductToDelete ] = useState<Product | null>(null);
  const [ productToUpdate, setProductToUpdate ] = useState<Product | null>(null);

  const [ selectedCategory, setSelectedCategory ] = useState("Todos");
  const [ sortBy, setSortBy ] = useState("name-asc"); 
  const [ isFiltersOpen, setIsFiltersOpen ] = useState(false);

  const [ currentPage, setCurrentPage ] = useState(1);
  const [ itemsPerPage, setItemsPerPage ] = useState(10);

  const categories = ["Todos", ...new Set(products.map(p => p.category.name || "General"))];

  useEffect(() => {
    fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const filteredAndSortedProducts = useMemo(() => {

    let result = products.filter((product) => {
      const matchCategory = selectedCategory === "Todos" || product.category.name === selectedCategory;
      const matchSearch = product.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()) || product.barcode.toLowerCase().includes(searchTerm.toLocaleLowerCase())

      return matchCategory && matchSearch;
    });

    result = result.sort((a, b) => {

      switch (sortBy) {
        case 'name-asc': 
          return a.name.localeCompare(b.name);
        
        case 'name-desc': 
          return b.name.localeCompare(a.name);
        
        case 'price-asc':
          return a.price - b.price;

        case 'price-desc':
          return b.price - a.price;

        case 'stock-asc':
          return a.stock - b.stock;

        case 'stock-desc':
          return b.stock - a.stock;

        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

        case 'oldest':
          return new Date(a.createdAt).getDate() - new Date(b.createdAt).getDate();
        
        default: 
          return 0;
      }
    });

    return result;
  }, [products, searchTerm, selectedCategory, sortBy])

  const totalItems = filteredAndSortedProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage); // Esta linea se encarga de calcular el total de paginas dependiendo del numero de items por pagina, math.cell redondea hacia arriba para evitar problemas cuando el numero de items no es divisible exactamente por itemsPerPage 

  const paginatedProducts = filteredAndSortedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getStatusConfig = (stock: number) => {
    if (stock === 0) return { text: "Out of stock", bg: "bg-red-50", textCol: "text-red-600", dot: "bg-red-500" };
    if (stock < 20) return { text: "Low Stock", bg: "bg-orange-50", textCol: "text-orange-600", dot: "bg-orange-500" };
    return { text: "In Stock", bg: "bg-green-50", textCol: "text-green-600", dot: "bg-green-500" };
  };

  return (
    <div className='w-full h-full flex flex-col p-4 overflow-hidden bg-slate-50'>
      <Toaster/>
      <Header name='Inventario'/>
      <div className='mt-5 mb-4 flex flex-wrap justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200'>
        <div className='relative flex-1 min-w-62.5 max-w-lg'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <Search className="text-gray-400" size={18} />
          </div>
          <input type='text' 
            placeholder='Buscar productos...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className='w-full pl-10 pr-8 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300'/>
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600'>
                <X size={16}/>
              </button>
            )}
        </div>
        <div className='flex flex-wrap items-center gap-3'>
          <div className='relative'>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className='appearance-none flex items-center gap-2 px-4 py-2 pr-8 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 cursor-pointer bg-white'>
              <option value={'name-asc'}>Nombre (A-Z)</option>
              <option value={'name-desc'}>Nombre (Z-A)</option>
              <option value={'price-desc'}>Mayor Precio</option>
              <option value={'price-asc'}>Menor Precio</option>
              <option value={'stock-desc'}>Mayor Stock</option>
              <option value={'stock-asc'}>Menor Stock</option>
              <option value={'newest'}>Más recientes</option>
              <option value={'oldest'}>Más antiguos</option>
            </select>
            <SlidersHorizontal size={16} className='absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500'/>
          </div>
          <button onClick={() => setIsFiltersOpen(!isFiltersOpen)} className='flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors'>
            <ListFilter size={17}/>
            <span className='hidden sm:block'>Filtrar</span>
          </button>
          <button onClick={() => {const modal = document.getElementById('modal_add_product') as HTMLDialogElement | null; modal?.showModal();}} className='flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm shadow-red-600/20'>
            <Plus size={20}/>
            <span className='hidden sm:block'>Agregar Producto</span>
          </button>
        </div>
      </div>

      <div className={`transition-all duration-300 ease-in-out ${isFiltersOpen ? 'max-h-20 opacity-100 mb-4' : 'max-h-0 opacity-0 mb-0 overflow-hidden'}`}>
        <div className='bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex items-center gap-2 overflow-x-auto custom-scrollbar'>
        <span className='text-xs font-bold text-gray-400 uppercase mr-2'>Filtro:</span>
        {categories.map((category) => (
          <button key={category} onClick={() => setSelectedCategory(category)} className={`px-4 py-1.5 rounded-lg text-sm font-bold whitespace-nowrap transition-all border ${selectedCategory === category ? "bg-red-600 text-white border-red-600 shadow-md" : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"}`}>{category}</button>
        ))}
        </div>
      </div>

      <div className='bg-white shadow-sm rounded-xl border border-gray-200 flex flex-col flex-1 overflow-y-auto w-full'>
        <div className='overflow-x-auto '>
          <table className='w-full text-left border-collapse whitespace-nowrap'>
            <thead className='text-gray-500 text-xs font-semibold uppercase border-b border-gray-200 sticky top-0 z-10 bg-white'>
              <tr>
                <th className='px-6 py-4'>Producto</th>
                <th className='px-6 py-4 text-center'>Categoría</th>
                <th className='px-6 py-4 text-center'>Estado</th>
                <th className='px-6 py-4 text-center'>Stock</th>
                <th className='px-6 py-4 text-center'>Costo</th>
                <th className='px-6 py-4 text-center'>Precio Venta</th>
                <th className='px-6 py-4 text-center'>Action</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {paginatedProducts.map((producto) => {
                const status = getStatusConfig(producto.stock);
                return (
                  <tr key={producto.id} className='hover:bg-red-50/50 transition-colors duration-200 group'>
                    <td className='px-6 py-4 flex '>
                      <div className='flex items-center gap-3'>
                        <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 shrink-0 overflow-hidden">
                          <Image unoptimized src={`https://ui-avatars.com/api/?name=${producto.name}&background=f3f4f6&color=ef4444`} alt={producto.name} width={110} height={110} className="w-full h-full object-cover" />
                        </div>
                        <span className='font-semibold text-gray-800 text-sm'>{producto.name}</span>
                      </div>
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-600 font-medium text-center'>
                      {producto.category?.name || "General"}
                    </td>
                    <td className='px-6 py-4 text-center'>
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${status.bg} ${status.textCol}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`}></span>
                        {status.text}
                      </div>                      
                    </td>
                     <td className='px-8 py-4 text-sm text-gray-600 font-medium text-center'>
                      {producto.stock}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-800 font-semibold text-center'>
                      S/ {producto.costPrice.toFixed(2)}
                    </td>
                    <td className='px-9 py-4 text-sm text-gray-800 font-semibold text-center'>
                      S/ {producto.price.toFixed(2)}
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center justify-center gap-3'>
                        <button onClick={() => {setIsDeleteOpen(true), setProductToDelete(producto)}} className='text-gray-400 hover:text-red-600 transition-colors' title="Eliminar">
                          <Trash2 size={18} />
                        </button>
                        <button onClick={() => {setProductToUpdate(producto); const modal = document.getElementById('modal_edit_product') as HTMLDialogElement; modal?.showModal();}} className='text-gray-400 hover:text-blue-600 transition-colors' title="Editar">
                          <PenLine size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {isLoadingProducts && !filteredAndSortedProducts.length && (
            <table className='flex flex-col w-full'>
              <tbody className='divide-y divide-gray-100 w-full'>
                {[...Array(10)].map((_, i) => <TableRowSkeleton key={i}/>)}
              </tbody>
            </table>
          )}
          {paginatedProducts.length === 0 && !isLoadingProducts && (
            <div className="p-12 text-center text-gray-500 flex flex-col items-center">
              <Search className="w-12 h-12 mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900">No se encontraron productos</h3>
              <p>No hay resultados que coincidan con &quot;{searchTerm}&quot;</p>
            </div>
          )}
        </div>
        <div className='mt-auto border-t border-gray-200 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4'>
          <div className='flex items-center gap-2 text-sm text-gray-500'>
            <span>Mostrar</span>
            <select value={itemsPerPage} onChange={(e) => {setItemsPerPage(Number(e.target.value)), setCurrentPage(1);}} className='border border-gray-200 rounded-md py-1 px-2 focus:outline-none focus:border-red-500 bg-white'>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span>por página</span>
            <span className="ml-4 border-l pl-4 border-gray-300">
              Total: <span className="font-bold text-gray-700">{totalItems}</span> productos
            </span>
          </div>

          <div className='flex items-center gap-1'>
            <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className='p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md disabled:opacity-30 disabled:hover:bg-transparent transition-colors'><ChevronLeft size={18}/></button>
            <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} className='p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md disabled:opacity-30 disabled:hover:bg-transparent transition-colors'><ChevronLeft size={18}/></button>
            <div className='flex items-center gap-2 text-sm text-gray-600 px-2 font-medium'>
              <span className='flex items-center gap-2'>Página<span className='w-8 h-8 flex items-center justify-center rounded-md bg-white border border-gray-200 shadow-sm text-red-600 font-bold'>{currentPage}</span> de {totalPages || 1}</span>
            </div>
            <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages || totalPages === 0} className='p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md disabled:opacity-30 disabled:hover:bg-transparent ml-2 transition-colors'><ChevronRight size={18}/></button>
            <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages || totalPages === 0} className='p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md disabled:opacity-30 disabled:hover:bg-transparent transition-colors'><ChevronRight size={18}></ChevronRight></button>
          </div>
        </div>
      </div>

      {/*MODAL*/}
      <AddProductModal/>
      <DeleteProductModal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} product={productToDelete}/>
      <EditProductModal product={productToUpdate}/>
    </div>
  )
}