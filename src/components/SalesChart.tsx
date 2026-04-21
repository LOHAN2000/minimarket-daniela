import React from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartData } from '../../types';

interface SalesChartProps {
  data: ChartData[];
}

export const SalesChart = ({ data }: SalesChartProps) => {
   
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full min-h-[350px] flex flex-col">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Resumen de Ventas (Últimos 7 días)</h3>
      <div className="flex-1 w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey="dateLabel" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dx={-10} tickFormatter={(val) => `S/${val}`}/>
            <Tooltip 
              cursor={{fill: '#fef2f2'}} 
              contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
              // 1. Cambiamos el tipo a "number | undefined"
              // 2. Usamos (value || 0) para asegurar que siempre haya un número antes del .toFixed()
              formatter={(value: number | undefined) => [`S/ ${(value || 0).toFixed(2)}`, 'Ventas']}
            />
            <Bar dataKey="totalSales" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
