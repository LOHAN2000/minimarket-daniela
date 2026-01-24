"use client"

import { Navbar } from '@/components/Navbar';
import { SideBar } from '@/components/SideBar';
import { useGlobalState } from '@/store'
import React from 'react'

export const DashBoardWrapper = ({ children }: { children: React.ReactNode }) => {

  const { isSideBarCollapsed } = useGlobalState();

  return (
      <div className="flex min-h-screen w-full bg-gray-50 text-gray-900 transition-colors duration-300">      
        
        <SideBar/>

      <main className={`flex flex-col w-full h-ful py-7 px-9 bg-gray-50 transition-all duration-300 ${isSideBarCollapsed ? "ml-15" : "ml-60"}`}>
        <Navbar/>
        {children}
      </main>

    </div>
  )
}
