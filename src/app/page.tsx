"use client"
import { SalesChart } from "@/components/SalesChart";
import { StatCard } from "@/components/StatCard";
import { DollarSign, Package, ShoppingBasket, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Ventas Totales" amount="$12,340" changeAmount="+12%" IconComponent={DollarSign} color="red"/>
        <StatCard title="Ingresos" amount="$8,250" changeAmount="+18%" IconComponent={ShoppingBasket} color="green"/>
        <StatCard title="clientes" amount="1,482" changeAmount="-5%" IconComponent={Users} color="purple"/>
        <StatCard title="Inventario" amount="145" changeAmount="+2%" IconComponent={Package} color="blue"/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 h-full">
          <SalesChart/>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Productos Populares</h3>
            <div className="space-y-4">
                {['Leche Gloria', 'Arroz Costeño', 'Inca Kola', 'Aceite Primor'].map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                        <span className="text-gray-600 text-sm font-medium">{item}</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Top {i+1}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
