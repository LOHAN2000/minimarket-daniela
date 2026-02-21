"use client"
import { useAuthStore } from '@/store/useAuthStore';
import { LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';

export const Navbar = () => {
  
  const { user, logout } = useAuthStore();
  const [ isMounted, setIsMounted ] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, [])

  return (
    <div className='flex justify-end items-center w-full mb-7 px-4 pt-4'>
      {isMounted && user ? (
        <div className='flex items-center gap-4'>
          <div className='flex flex-col text-right'>
            <span className='text-sm font-bold text-slate-800'>{user?.unique_name}</span>
            <span className='text-xs font-medium text-sky-400'>{user?.role}</span>
          </div>
          <div className='w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold'>
            {(user?.unique_name)?.charAt(0).toUpperCase() + "" + (user?.LastName)?.charAt(0).toUpperCase()}
          </div>
          <button onClick={logout} className='p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all ml-2'>
            <LogOut className='w-5 h-5'/>
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3 animate-pulse">
          <div className="w-24 h-4 bg-slate-200 rounded"></div>
          <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
        </div>
      )}
    </div>
  )
}
