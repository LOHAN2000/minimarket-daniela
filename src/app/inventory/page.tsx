"use client"
import { Header } from '@/components/Header';
import { PenLineIcon, Search } from 'lucide-react';
import React, { useState } from 'react'

interface Product {
  productId: string;
  name: string;
  price: number;
  rating: number;
  stockQuantity: number;
}

const initialData: Product[] = [
  { productId: "1", name: "Leche Gloria Azul", price: 4.50, rating: 4, stockQuantity: 120 },
  { productId: "2", name: "Arroz Costeño 1kg", price: 3.80, rating: 5, stockQuantity: 50 },
  { productId: "3", name: "Inca Kola 1.5L", price: 7.00, rating: 5, stockQuantity: 20 },
  { productId: "4", name: "Aceite Primor", price: 12.50, rating: 3, stockQuantity: 15 },
  { productId: "5", name: "Fideos Don Vittorio", price: 2.50, rating: 4, stockQuantity: 80 },
  { productId: "6", name: "Detergente Bolivar", price: 15.00, rating: 4, stockQuantity: 10 },
  { productId: "7", name: "Atún Florida", price: 5.20, rating: 5, stockQuantity: 200 },
];

export default function Inventory() {

  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = initialData.filter((product) => product.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()));

  return (
    <div className='flex flex-col'>
      <Header name='Inventario'/>

      <div className='mt-5 mb-6 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100'>
        <div className='relative w-full md:w-1/3'>
          <input type='search' placeholder='Buscar producto...' className='pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-red-300 transition-all duration-300' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-gray-400" size={20} />
          </div>
        </div>
      </div>

      <div className='bg-white shadow-md rounded-xl overflow-hidden border border-gray-100'>
        <div className='overflow-x-auto'>
          <table className='w-full text-left border-collapse'>
            <thead className='bg-gray-50 text-gray-700 uppercase text-xs font-semibold'>
              <tr>
                <th className='px-6 py-4 w-1/4'>Producto</th>
                <th className='px-6 py-4 w-1/6 text-center'>Precio</th>
                <th className='px-6 py-4 w-1/6 text-center'>Stock</th>
                <th className='px-6 py-4 w-1/6 text-center'>Rating</th>
                <th className='px-6 py-4 w-1/6 text-center'>Acciones</th>
              </tr>
            </thead>

            <tbody className='divide-y divide-gray-100'>
              {filteredProducts.map((producto) => (
                <tr key={producto.productId} className='hover:bg-red-50 transition-colors duration-300'>
                  <td className='px-6 py-4 font-medium text-gray-900 w-1/4'>{producto.name}</td>
                  <td className='px-6 py-4 text-green-600 font-semibold w-1/6 text-center'>S/ {producto.price.toFixed(2)}</td>
                  <td className='px-6 py-4 w-1/6 text-center'>
                    <span className={`px-2 rounded-full text-xs font-semibold ${producto.stockQuantity >= 20 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{producto.stockQuantity} un.</span>
                  </td>
                  <td className='px-6 py-4 text-center text-yellow-500 w-1/6'>
                    {"★".repeat(producto.rating)}
                    <span className='text-gray-300'>{"★".repeat(5 - producto.rating)}</span>
                  </td>
                  <td className='px-6 py-4 text-center w-1/6'>
                    <button className='text-gray-600 hover:underline text-sm font-medium cursor-pointer'><PenLineIcon size={18}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredProducts.length === 0 && (
            <div className="p-8 text-center text-gray-500">
                    <h1>No se encontraron productos que coincidan con {searchTerm}</h1>
            </div>
          )}

        </div>

      </div>
    </div>
  )
}
