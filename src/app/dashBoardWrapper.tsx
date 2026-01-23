"use client"

import { SideBar } from '@/components/SideBar';
import { useGlobalState } from '@/store/intex'
import React from 'react'

export const DashBoardWrapper = ({ children }: { children: React.ReactNode }) => {

  const { isSideBarCollapsed } = useGlobalState();

  return (
    <div className='flex min-h-screen bg-gray-50 w-full text-gray-900'>
      <SideBar/>

      <main className={`flex flex-col w-full h-ful py-7 px-9 bg-gray-50 transition-all duration-300 ${isSideBarCollapsed ? "ml-15" : "ml-60"}`}>
        {children}
      </main>

    </div>
  )
}
