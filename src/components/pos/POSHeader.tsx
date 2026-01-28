import { Filter, LayoutGrid, ScanBarcode, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface POSHeaderProps {
  onScan: (code: string) => void;
  onSearchChange: (term: string) => void;
  onFilterClick: () => void;
}

export const POSHeader = ({onScan, onSearchChange, onFilterClick}: POSHeaderProps) => {

  const [scanCode, setScanCode] = useState("")

  useEffect(() => {
    if (scanCode.trim() === "") return;

    const timeutId = setTimeout(() => {
      onScan(scanCode);
      setScanCode("");
    }, 300)

    return () => clearTimeout(timeutId);

  }, [scanCode, onScan])

  const handleScanInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScanCode(e.target.value);
  }

  return (
    <header className='flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 shadow-sm h-20 z-20 rounded-xl'>
      <div className='flex items-center gap-4'>
        <div className='bg-red-600 p-2 rounded-lg'>
          <LayoutGrid className="text-white" size={24} />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">POS System</h1>
      </div>

      <div className='flex gap-3'>
        <div className='relative w-full'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <ScanBarcode color='red' size={20}/>
          </div>
          <input type='text' placeholder='Escanear...' autoFocus={true} onChange={handleScanInput} value={scanCode} className='pl-10 pr-4 py-2.5 w-full border border-gray-200  rounded-xl focus:outline-none focus:border-red-500 font-medium transition-colors duration-300' />
        </div>

        <div className='relative w-full'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <Search color='red' size={20}/>
          </div>
          <input type='text' placeholder='Buscar Producto...' onChange={(e) => onSearchChange(e.target.value)} className='pl-10 pr-4 py-2.5 w-full  border border-gray-200 rounded-xl focus:outline-none focus:border-red-500 font-medium transition-colors duration-300' />
        </div>
        
        <button onClick={onFilterClick} className="w-auto flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 text-gray-600 font-medium transition-colors px-4">
          <Filter size={18} />
          <span className="hidden xl:inline">Filtros</span>
        </button>
      </div>
    </header>
  )
}