import { SideBar } from "@/components/SideBar";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBar/>

      <main className="flex-1 ml-64 p-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm">Ventas Totales</h3>
            <p className="text-2xl font-bold text-gray-900">$1,234.00</p>
        </div>
      </main>
    </div>
  );
}
