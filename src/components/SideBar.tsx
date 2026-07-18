"use client"
import { useGlobalState } from '@/store'
import { DollarSign, LayoutDashboard, LogOut, Menu, Package, ShoppingCart, LucideIcon, Users } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useAuthStore } from '@/store/useAuthStore'

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/pos", label: "Venta", icon: DollarSign },
  { href: "/users", label: "Usuarios", icon: Users },
  { href: "/inventory", label: "Inventario", icon: Package },
];

export const SideBar = () => {

  const { user, logout } = useAuthStore();
  const [ isMounted, setIsMounted ] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, [])

  const { isSideBarCollapsed, setIsSideBarCollapsed } = useGlobalState();
  const pathName = usePathname();

  const sideBarClassNames = `fixed flex flex-col bg-white overflow-y-auto overflow-x-hidden shadow-lg z-40 h-full transition-all duration-300 ${isSideBarCollapsed ? "w-20" : "w-64"}`

  return (
    <div className={sideBarClassNames}>
      <div className={`flex items-center ${isSideBarCollapsed ? "justify-center h-20" : "justify-center h-30"} w-full  px-4 border-b border-slate-200`}>
        {
          !isSideBarCollapsed && (
            <Link href={"/"}>
              <div className='flex items-center justify-center transition-all'>
                <Image src={"/logo-minimarket-daniela.jpg"} alt="Logo Minimarket Daniela" width={110} height={64} style={{ objectFit: 'contain' }} loading="eager" priority/>
              </div>
            </Link>
          )
        }
        <button className={`p-2 hover:bg-red-50 text-slate-600 rounded-lg ${!isSideBarCollapsed ? 'absolute right-2 top-2' : ''}`} onClick={() => setIsSideBarCollapsed(!isSideBarCollapsed)}>
          <Menu size={20}/>
        </button>
      </div>

      <nav className="mt-8 flex flex-col gap-2 px-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className={`flex items-center rounded-lg py-3 transition-all duration-300 ${pathName === item.href ? "bg-red-600 text-white shadow-lg shadow-red-500/30" : "text-slate-500 hover:bg-red-50 hover:text-red-600"} ${isSideBarCollapsed ? "justify-center" : "gap-3 px-4"}`}>
            <item.icon size={20} />
            {!isSideBarCollapsed && <span className="font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="mt-auto p-2">
        {isMounted && user ? (
          <div className={`flex items-center gap-3 ${isSideBarCollapsed ? 'justify-center' : 'p-2'}`}>
            <div className='w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold shrink-0'>
              {(user?.unique_name)?.charAt(0).toUpperCase() + "" + (user?.lastName)?.charAt(0).toUpperCase()}
            </div>
            {!isSideBarCollapsed && (
              <>
                <div className='flex flex-col text-start overflow-hidden'>
                  <span className='text-sm font-bold text-slate-800 truncate'>{user?.unique_name}</span>
                  <span className='text-xs font-bold text-red-500'>{user?.role}</span>
                </div>
                <button onClick={logout} className='p-2 text-slate-500 hover:bg-red-100 hover:text-red-600 rounded-lg transition-all ml-auto'>
                  <LogOut className='w-5 h-5'/>
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center gap-3 animate-pulse p-2">
            <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
            {!isSideBarCollapsed && <div className="w-24 h-4 bg-slate-200 rounded"></div>}
          </div>
        )}
        <div className={`w-full pt-4 text-center text-xs text-slate-400 border-t border-slate-200/80 mt-2 ${isSideBarCollapsed ? "hidden" : "block"}`}>
          <p>&copy; 2026 Minimarket Daniela</p>
        </div>
      </div>

    </div>
  )
}
