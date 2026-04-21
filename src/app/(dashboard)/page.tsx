"use client"
import { SalesChart } from "@/components/SalesChart";
import { StatCard } from "@/components/StatCard";
import { useDashBoardStore } from "@/store/useDashboardStore";
import { DollarSign, Loader2Icon, Package, ShoppingBasket, Users } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {

  const { stats, fetchStats, isLoading } = useDashBoardStore();
  const [timefilter, setTimeFilter] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  useEffect(() => {
    fetchStats();
  }, [fetchStats])

  if (isLoading || !stats) {
    return <div className="min-h-screen flex items-center justify-center font-mono text-gray-300"><Loader2Icon size={50} className="animate-spin"/></div>;
  }

  console.log(stats)

  const currentStats = stats[timefilter];
  console.log(stats)

  return ( 
    <div className="flex flex-col gap-8 p-4">
      
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Panel General</h2>
        <div className="bg-white border border-gray-200 p-1 rounded-xl shadow-sm flex gap-1">
          {['daily', 'weekly', 'monthly'].map((filter) => (
            <button className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${timefilter === filter ? 'bg-red-500 text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`} key={filter} onClick={() => setTimeFilter(filter as any)}>
              {filter === 'daily' ? 'Hoy' : filter === 'weekly' ? 'Esta semana' : 'Este mes'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard 
            title="Ingresos" 
            amount={`S/ ${currentStats.ingresos.toFixed(2)}`} 
            changeAmount={`${currentStats.ingresosCambio > 0 ? '+' : ''}${currentStats.ingresosCambio.toFixed(1)}%`} 
            IconComponent={DollarSign} 
            color="green"
        />
        <StatCard 
            title="Tickets Emitidos" 
            amount={currentStats.ventas.toString()} 
            changeAmount={`${currentStats.ventasCambio > 0 ? '+' : ''}${currentStats.ventasCambio.toFixed(1)}%`} 
            IconComponent={ShoppingBasket} 
            color="purple"
        />
        <StatCard 
            title="Ticket Promedio" 
            amount={`S/ ${currentStats.ticketPromedio.toFixed(2)}`} 
            changeAmount="N/A" // Ticket promedio suele ser constante, pero puedes agregarle cambio también
            IconComponent={Users} 
            color="blue"
        />
        <StatCard 
            title="Alertas de Stock" 
            amount={currentStats.productosBajos.toString()} 
            changeAmount="ítems" 
            IconComponent={Package} 
            color="red"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-81">
          <div className="lg:col-span-2 h-full">
            <SalesChart data={stats.chartData}/>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Productos Populares</h3>
            <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-2">
                
                {/* Iteramos sobre el Top 5 real */}
                {stats.topProducts && stats.topProducts.length > 0 ? (
                  stats.topProducts.map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-2.5 border-b border-gray-50 last:border-0">
                        <div className="flex flex-col">
                          <span className="text-gray-700 text-sm font-bold line-clamp-1">{item.name}</span>
                          <span className="text-gray-400 text-xs">{item.quantitySold} vendidas</span>
                        </div>
                        {i < 3 ? (
                          <span className="text-[10px] bg-red-50 text-red-600 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
                            Top {i+1}
                          </span>
                        ) : (
                          <span className="text-[10px] bg-gray-100 text-gray-500 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
                            #{i+1}
                          </span>
                        )}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 text-center mt-10">Aún no hay ventas registradas.</p>
                )}

            </div>
          </div>
      </div>
    </div>
  )
}
