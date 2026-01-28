import { useCartStore } from '@/store/useCartStore';
import { Banknote, Calculator, Minus, Plus, ShoppingCart, Trash, Trash2 } from 'lucide-react';
import React, { useState } from 'react'

interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  stock: number;
  category: string;
  color?: string;
}

interface OrderSumaryProps {
  cart: any[];
  subtotal: number;
  igv: number;
  total: number;
  OnRemoveItem: (id: number) => void;
  onUpdateQty: (id: number, delta: number) => void;
  onClearCart: () => void;
  onProcessSale: () => void;
}

export const OrderSumary = ({cart, subtotal, igv, total, OnRemoveItem, onUpdateQty, onClearCart, onProcessSale}: OrderSumaryProps) => {

  const [montoEntregado, setMontoEntregado] = useState<number>(0);
  const cambio = montoEntregado - total;
  const isSufficient = montoEntregado >= total;
  const hasItems = cart?.length > 0; 

  const handleMontoRapido = (monto: number) => {
    setMontoEntregado(monto);
  }

  const handleCobrar = () => {
    if(isSufficient && hasItems) {
      onProcessSale();
      setMontoEntregado(0);
    }
  }

  return (
    <div className='w-[35%] bg-white border-l border-gray-200 flex flex-col shadow-xl z-40'>
        <div className='flex p-4 border-b border-gray-100 bg-white'>
          <div className='flex justify-between items-center mb-2 w-full'>
            <div className='flex items-center space-x-1'>
              <h2 className='font-bold text-2xl text-gray-800 flex items-center gap-4'><ShoppingCart size={32} className='text-red-500'/>Venta Actual</h2>
              <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">{cart?.length} items</span>
            </div>
            <button onClick={() => onClearCart()} className='text text-red-600 text-sm font-semibold hover:bg-gray-200 px-2 py-1 rounded transition-colors flex items-center gap-1 ms-auto'><Trash size={19}/>Limpiar</button>
          </div>
        </div>

        <div className='flex-1 flex-col gap-2 overflow-y-auto p-4 space-y-3 bg-gray-50/50'>
          {cart?.map((item) => (
            <div key={item.id} className='bg-white p-3 rounded-xl border border-gray-200 shadow-md flex flex-col gap-2 group hover:border-red-300 transition-colors'>
              <div className='flex justify-between items-start'>
                <div className='flex flex-col'>
                  <div className='flex items-center space-x-2.5'>
                    <h4 className='font-bold text-gray-800 text-md'>{item.name}</h4>
                    <div className='text-xs text-gray-400'>
                      S/{item.price.toFixed(2)} x un.
                    </div>
                  </div>
                  <p className='text-[13px] text-gray-400 font-mono'>{item.sku}</p>
                </div>
                <button onClick={() => OnRemoveItem(item.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                  <Trash2 size={16}/>
                </button>
              </div>
              <div className='flex justify-between items-center mt-1'>
                <div className='flex items-center gap-3 bg-gray-100 rounded-lg p-0.5'>
                  <button onClick={() => onUpdateQty(item.id, -1)} className='p-1 hover:bg-white hover:shadow-sm rounded-md transition-all text-gray-600'><Minus size={15}/></button>
                  <span className='font-bold text-sm w-6 text-center'>{item.qty}</span>
                  <button onClick={() => onUpdateQty(item.id, 1)} className='p-1 hover:bg-white hover:shadow-sm rounded-md transition-all text-gray-600'><Plus size={15}/></button>
                </div>
                <span className='font-bold text-gray-900'>S/ {(item.price * item?.qty).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className='flex p-5 bg-white border-t border-gray-200 shadow-([0_-4px_20px_-5px_rgba(0,0,0,0.1)]'>
          <div className='space-y-1 mb-1 text-sm flex flex-col gap-1 w-full'>
            <div className='flex justify-between text-gray-600 font-bold text-xl space-x-2'>
              <span>Subtotal</span>
              <span>S/{subtotal.toFixed(2)}</span>
            </div>
            <div className='flex justify-between text-gray-500'>
              <span>IGV (0%)</span>
              <span>S/{igv.toFixed(2)}</span>
            </div>
            <div className='flex justify-between text-2xl font-black text-gray-900 mt-2 pt-2 border-t border-dashed border-gray-300'>
              <span>Total</span>
              <span>S/{total.toFixed(2)}</span>
            </div>
            {montoEntregado > 0 && (
              <div className={`flex justify-between text-xl font-bold mt-2 pt-2 border-t border-dashed border-gray-300 ${isSufficient ? 'text-green-600' : 'text-red-600'}`}>
                <span>{isSufficient ? 'Cambio' : 'Falta'}</span>
                <span>S/{Math.abs(cambio).toFixed(2)}</span>
              </div>
            )}
          </div>
        </div>
        <div className='relative mx-3'>
          <input type='number' value={montoEntregado || ''} onChange={(e) => setMontoEntregado(parseFloat(e.target.value) || 0)} placeholder='Monto entregado...' className='w-full bg-gray-50 border border-gray-300 rounded-xl py-3 pl-4 pr-10 font-bold text-lg text-gray-900 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all placeholder:font-normal placeholder:text-gray-400'/>
          <Calculator className='absolute right-1 top-3 text-gray-400' size={30}/>
        </div>
        <div className="flex gap-2 mt-3 px-2">
            {[10, 20, 50, 100, 200].map(monto => (
                <button onClick={() => handleMontoRapido(monto)} key={monto} className="flex-1 cursor-pointer bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-600 py-1.5 rounded-lg transition-colors">
                    S/ {monto}
                </button>
            ))}
        </div>
        <button onClick={handleCobrar} disabled={!isSufficient || !hasItems} className={`w-full mt-3 font-bold py-4 rounded-xl shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-lg uppercase tracking-wide ${isSufficient && hasItems ? "bg-red-500 hover:bg-red-600 text-white shadow-red-200 cursor-pointer" : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"}`}>
            <Banknote size={24}/>
            <span>Cobrar S/{total.toFixed(2)}</span>
        </button>
    </div>
  )
}
