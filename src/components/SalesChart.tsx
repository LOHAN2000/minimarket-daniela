import { TrendingUp } from 'lucide-react';
import React from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export const SalesChart = () => {
  
  const data = [
  { name: 'Lun', ventas: 4000 },
  { name: 'Mar', ventas: 3000 },
  { name: 'Mie', ventas: 2000 },
  { name: 'Jue', ventas: 2780 },
  { name: 'Vie', ventas: 1890 },
  { name: 'Sab', ventas: 2390 },
  { name: 'Dom', ventas: 3490 },
];
  
  return (
    <div className='bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between'>
      
      <div className='flex justify-between items-center mb-6'>
        <h3 className='text-lg font-bold text-gray-800'>Resumen de Ventas</h3>
        <div className='flex items-center gap-2 text-green-600 text-sm font-semibold'>
            <TrendingUp size={18} />
            <span>+4.5%</span>
        </div>
      </div>

      <div className='h-64 w-full'>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke='#e5e7eb'/> 
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}}/>
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}}/>
            <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}/>
            <Bar dataKey="ventas" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
