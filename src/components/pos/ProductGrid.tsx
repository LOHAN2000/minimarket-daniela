import { Plus } from 'lucide-react';
import React from 'react'
import { Product } from '../../../types';
import { ProductGridSkeleton } from '../skeletons/ProductGridSkeleton';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  onAddCart: (product: Product) => void;
}

export const ProductGrid = ({products, onAddCart, isLoading}: ProductGridProps) => {
  return (
    <div className='w-full overflow-y-auto bg-gray-50/50 transition-all pb-5'>
      <div className='flex justify-between items-center mb-4 px-4 sticky top-0 z-10 bg-white p-2 py-3 border-b border-gray-200 shadow-sm rounded-xl'>
        <h2 className='text-lg font-bold text-gray-700'>Productos Disponibles</h2>
        <span className="text-xs font-bold text-gray-400 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">{isLoading ? "Cargando..." : products.length + " items"}</span>
      </div>

      <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-2'>
        {isLoading && (
          [...Array(10)].map((_, i) => <ProductGridSkeleton key={i} />)
        )}
        {!isLoading && products?.map((product) => (
          <div key={product.id} className='bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-red-400 hover:scale-[1.02] transition-all flex flex-col justify-between h-40 group relative overflow-hidden select-none'>
            <div>
              <h3 className='font-bold text-gray-800 text-lg line-clamp-2 leading-tight pr-4 mt-2'>{product.name}</h3>
              <p className='text-[14px] text-gray-400 mt-1 font-mono'>Código: {product.barcode}</p>
            </div>
            <div className='flex justify-between items-end mt-2'>
              <div>
                <span className='block text-[15px] text-gray-400 mb-0.5'>Precio</span>
                <span className='text-lg font-bold text-red-400'>S/ {product.price.toFixed(2)}</span>
              </div>
              <button onClick={() => onAddCart(product)} className="bg-blue-50 text-red-600 p-1.5 rounded-lg group-hover:bg-red-600 group-hover:text-white transition-colors shadow-sm cursor-pointer">
                <Plus size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
