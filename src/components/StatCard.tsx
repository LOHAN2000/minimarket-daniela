import { LucideIcon } from 'lucide-react';
import React from 'react'

interface StatCardProps {
  title: string;
  amount: string;
  changeAmount: string;
  IconComponent: LucideIcon;
  color: "blue" | "green" | "red" | "purple";
  filter?: 'daily' | 'weekly' | 'monthly';
}


export const StatCard = ({ title, amount, changeAmount, IconComponent, color, filter }: StatCardProps) => {
  
  const colorClasses = {
    blue: "text-blue-600 bg-blue-50 border-blue-200",
    green: "text-green-600 bg-green-50 border-green-200",
    red: "text-red-600 bg-red-50 border-red-200",
    purple: "text-purple-600 bg-purple-50 border-purple-200",
  };
  
  return (
    <div className='bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between'>
      <div className='flex justify-between items-start space-x-3 my-auto'>
        <div className='flex flex-col w-full justify-center h-full '>
          <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
          <h2 className="text-xl font-bold text-gray-900">{amount}</h2>
        </div>

        <div className={`my-auto p-3 rounded-xl border ${colorClasses[color]}`}>
          <IconComponent size={24}/>
        </div>

        <div className='flex items-center text-sm my-auto'>
          <span className="text-green-600 font-semibold">{changeAmount}</span>
          <span className="text-gray-400 text-end ml-2">vs {filter === 'daily' ? 'ayer' : filter === 'weekly' ? 'semana pasada' : 'mes pasado'}</span>
        </div>
      </div>

    </div>
  )
}
