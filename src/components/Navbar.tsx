"use client"

import { useGlobalState } from '@/store'
import { Bell, Menu, Search } from 'lucide-react';


export const Navbar = () => {
  
  const { setIsSideBarCollapsed, isSideBarCollapsed} = useGlobalState();

  return (
    <div className='flex justify-between items-center w-full mb-7 px-4 pt-4'>
      <div className='flex justify-between items-center gap-5'>
        <button className='bg-gray-100 rounded-full hover:bg-gray-100-100' onClick={() => setIsSideBarCollapsed(!isSideBarCollapsed)}>
          <Menu size={20}/>
        </button>
      </div>
      <div className='reflex justify-center w-3/4 md:w-1/2'>
        <input type='search' placeholder='Buscar productos...' className='pl-4 md:pl-10 pr-4 py-2 w-full border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-red-400 transition-all duration-300'/>
        <div className='left-170 top-16 pl-3 flex items-center pointer-events-none'>
          <Search className="hidden md:flex absolute inset-y-16 text-gray-500" size={20} />
        </div>
      </div>
      <div className='flex justify-between items-center gap-5'>
        <div className='hidden md:flex justify-between items-center gap-4'>
          <div className='relative'>
            <Bell className='cursor-pointer text-gray-500' size={24}/>
            <span className='absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.2em] py-[0.2em] text-sm font-bold leading-none text-red-100 bg-red-600 rounded-full'>3</span>
          </div>
          <hr className='w-0 h-7 border border-solid bolder-l border-gray-300 mx-3'/>
          <div className='flex w-full items-center justify-center gap-3 cursor-pointer'>
            <div className='flex flex-col items-center'>
              <div className='w-9 h-9 rounded-full bg-red-500 flex items-center justify-center text-white font-bold'>
                DN
              </div>
              <span className='font-semibold text-gray-700'>Admin</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
