"use client"
import { useGlobalState } from '@/store'
import { DollarSign, LayoutDashboard, Menu, Package, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

export const SideBar = () => {

  const { isSideBarCollapsed, setIsSideBarCollapsed } = useGlobalState();

  const sideBarClassNames = `fixed flex flex-col bg-white overflow-hidden shadow-md z-40 h-full transition-all duration-300 ${isSideBarCollapsed ? "w-16" : "w-64"}`

  return (
    <div className={sideBarClassNames}>
      <div className={`flex items-center justify-between w-full ${isSideBarCollapsed ? "px-5.5 pt-5" : "px-8 pt-2"}`}>
        {
          !isSideBarCollapsed && (
            <Link href={"/"}>
              <div className='flex items-center justify-center overflow-hidden transition-all'>
                <Image src={"/logo-minimarket-daniela.jpeg"} alt="Logo Minimarket Daniela" width={200} height={80} loading="eager" priority className="scale-230 transition-all"/>
              </div>
            </Link>
          )
        }
        <button className='hover:bg-gray-100 rounded-full' onClick={() => setIsSideBarCollapsed(!isSideBarCollapsed)}>
          <Menu size={isSideBarCollapsed ? 20 : 25}/>
        </button>
        
      </div>

      <nav className="mt-8 flex flex-col gap-2 px-2">
        <Link href="/" className={`flex items-center rounded-lg bg-blue-50 py-3 text-blue-700 transition-all duration-300 ${isSideBarCollapsed ? "gap-0 justify-center px-2" : "gap-3 px-4"}`}>
          <LayoutDashboard size={20} />
          {!isSideBarCollapsed && <span className="font-medium">Dashboard</span>}
        </Link>
        
        <Link href="/pos" className={`flex items-center rounded-lg py-3 text-gray-500 hover:bg-gray-100 transition-all duration-300 ${isSideBarCollapsed ? "gap-0 justify-center px-2" : "gap-3 px-4"}`}>
          <DollarSign size={20} />
          {!isSideBarCollapsed && <span className="font-medium">Venta</span>}
        </Link>

        <Link href="/inventory" className={`flex items-center rounded-lg py-3 text-gray-500 hover:bg-gray-100 transition-all duration-300 ${isSideBarCollapsed ? "gap-0 justify-center px-2" : "gap-3 px-4"}`}>
          <Package size={20} />
          {!isSideBarCollapsed && <span className="font-medium">Inventario</span>}
        </Link>

        <Link href="/products" className={`flex items-center rounded-lg py-3 text-gray-500 hover:bg-gray-100 transition-all duration-300 ${isSideBarCollapsed ? "gap-0 justify-center px-2" : "gap-3 px-4"}`}>
          <ShoppingCart size={20} />
          {!isSideBarCollapsed && <span className="font-medium">Productos</span>}
        </Link>

      </nav>

      {/* 3. Footer del menú */}
      <div className="absolute bottom-0 w-full p-4 text-center text-xs text-gray-400">
        {!isSideBarCollapsed && <p>&copy; 2026 Minimarket Daniela</p>}
      </div>

    </div>
  )
}
