"use client"

import { Navbar } from '@/components/Navbar';
import { SideBar } from '@/components/SideBar';
import { useGlobalState } from '@/store'
import { usePathname } from "next/navigation";
import React from 'react'

export const DashBoardWrapper = ({ children }: { children: React.ReactNode }) => {

  const { isSideBarCollapsed } = useGlobalState();
  const pathname = usePathname();

  // Lógica simplificada: Definimos en qué rutas NO queremos la Navbar
  const hiddenNavbarPaths = ["/pos", "/inventory", "/products"];
  
  // Verificamos si la ruta actual está en la lista de ocultas
  // Si NO está incluida, entonces mostramos la Navbar
  const isNavbarVisible = !hiddenNavbarPaths.includes(pathname);

  return (
    <div className="flex h-full overflow-hidden w-full bg-gray-50 text-gray-900 transition-colors duration-300">      
        
        <SideBar/>

        <main className={`flex flex-col w-full h-full overflow-hidden px-9 bg-gray-50 transition-all duration-300 ${isSideBarCollapsed ? "ml-15" : "ml-60"}`}>
            
            {/* Renderizado condicional limpio */}
            {isNavbarVisible && <Navbar/>}
            
            {/* Los hijos (children) se renderizan siempre, o puedes condicionarlos también si fuera necesario */}
            {children}

        </main>

    </div>
  )
}

export default DashBoardWrapper;