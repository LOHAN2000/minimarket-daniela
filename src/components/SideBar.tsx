import { LayoutDashboard, Package, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const SideBar = () => {
  return (
    <div className='fixed left-0 top-0 h-full w-64 bg-white shadow-md z-40 overflow-y-auto'>
      <div className='flex flex-col items-left justify-center pt-8 pb-4 p-3 '>
        <h1 className='text-2xl font-bold text-red-600'>Minimarket</h1>
        <h1 className='text-2xl font-bold text-red-600'>Daniela</h1>
      </div>

      <nav className="mt-8 flex flex-col gap-2 px-4">
        {/* Enlace al Dashboard */}
        <Link href="/" className="flex items-center gap-3 rounded-lg bg-blue-50 px-4 py-3 text-blue-700 transition-colors">
          <LayoutDashboard size={20} />
          <span className="font-medium">Dashboard</span>
        </Link>

        {/* Enlace al Inventario */}
        <Link href="/inventory" className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-500 hover:bg-gray-100 transition-colors">
          <Package size={20} />
          <span className="font-medium">Inventario</span>
        </Link>

         {/* Enlace a Productos */}
         <Link href="/products" className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-500 hover:bg-gray-100 transition-colors">
          <ShoppingCart size={20} />
          <span className="font-medium">Productos</span>
        </Link>
      </nav>

      {/* 3. Footer del menú */}
      <div className="absolute bottom-0 w-full p-4 text-center text-xs text-gray-400">
        &copy; 2026 Minimarket
      </div>

    </div>
  )
}
