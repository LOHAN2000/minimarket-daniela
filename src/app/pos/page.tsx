"use client"
import { OrderSumary } from '@/components/pos/OrderSumary';
import { POSHeader } from '@/components/pos/POSHeader'
import { ProductGrid } from '@/components/pos/ProductGrid'
import { useCartStore } from '@/store/useCartStore'
import React, { useMemo } from 'react'

const products = [
  { id: 1, name: "Limpiador Multiuso", sku: "GR069", price: 15.50, stock: 51, category: "Limpieza", color: "bg-blue-50" },
  { id: 2, name: "Papel Aluminio", sku: "GR070", price: 8.90, stock: 39, category: "Hogar", color: "bg-gray-50" },
  { id: 3, name: "Manzanas Rojas", sku: "GR002", price: 4.50, stock: 68, category: "Frutas", color: "bg-red-50" },
  { id: 4, name: "Aceite Vegetal", sku: "GR025", price: 12.00, stock: 25, category: "Despensa", color: "bg-yellow-50" },
  { id: 5, name: "Coca Cola 3L", sku: "GR099", price: 11.50, stock: 50, category: "Bebidas", color: "bg-red-100" },
  { id: 6, name: "Inca Kola 1.5L", sku: "GR098", price: 7.50, stock: 40, category: "Bebidas", color: "bg-yellow-100" },
  { id: 7, name: "Pan de Molde", sku: "GR055", price: 5.80, stock: 20, category: "Panadería", color: "bg-orange-50" },
  { id: 8, name: "Leche Gloria", sku: "GR033", price: 4.20, stock: 100, category: "Lácteos", color: "bg-blue-100" },
  { id: 9, name: "Queso Fresco", sku: "GR034", price: 18.50, stock: 35, category: "Lácteos", color: "bg-yellow-100" },
  { id: 10, name: "Yogurt Natural", sku: "GR035", price: 3.80, stock: 60, category: "Lácteos", color: "bg-pink-50" },
  { id: 11, name: "Huevos x12", sku: "GR036", price: 7.20, stock: 80, category: "Proteína", color: "bg-amber-50" },
  { id: 12, name: "Pollo Fresco", sku: "GR037", price: 22.00, stock: 45, category: "Proteína", color: "bg-orange-100" },
  { id: 13, name: "Atún en Lata", sku: "GR038", price: 6.50, stock: 72, category: "Conservas", color: "bg-blue-100" },
  { id: 14, name: "Fideos Don Carlo", sku: "GR039", price: 2.50, stock: 150, category: "Despensa", color: "bg-yellow-50" },
  { id: 15, name: "Arroz Premium", sku: "GR040", price: 4.80, stock: 95, category: "Despensa", color: "bg-yellow-50" },
  { id: 16, name: "Frijoles Rojos", sku: "GR041", price: 5.20, stock: 55, category: "Despensa", color: "bg-red-100" },
  { id: 17, name: "Café Nescafé", sku: "GR042", price: 14.50, stock: 32, category: "Bebidas", color: "bg-amber-100" },
  { id: 18, name: "Té Negro", sku: "GR043", price: 8.00, stock: 42, category: "Bebidas", color: "bg-amber-50" },
  { id: 19, name: "Jugo Tampico", sku: "GR044", price: 3.50, stock: 85, category: "Bebidas", color: "bg-orange-100" },
  { id: 20, name: "Agua Cielo 1.5L", sku: "GR045", price: 2.20, stock: 120, category: "Bebidas", color: "bg-blue-50" },
  { id: 21, name: "Sal Fina", sku: "GR046", price: 1.80, stock: 200, category: "Despensa", color: "bg-gray-50" },
  { id: 22, name: "Azúcar Blanca", sku: "GR047", price: 3.90, stock: 110, category: "Despensa", color: "bg-gray-100" },
  { id: 23, name: "Harina Integral", sku: "GR048", price: 4.50, stock: 78, category: "Despensa", color: "bg-orange-50" },
  { id: 24, name: "Mantequilla Gloria", sku: "GR049", price: 11.80, stock: 28, category: "Lácteos", color: "bg-yellow-100" },
  { id: 25, name: "Mayonesa Alacena", sku: "GR050", price: 6.80, stock: 48, category: "Condimentos", color: "bg-yellow-50" },
  { id: 26, name: "Ketchup Heinz", sku: "GR051", price: 5.90, stock: 65, category: "Condimentos", color: "bg-red-100" },
  { id: 27, name: "Mostaza Francesa", sku: "GR052", price: 4.50, stock: 38, category: "Condimentos", color: "bg-yellow-100" },
  { id: 28, name: "Salsa Ají Mágico", sku: "GR053", price: 3.20, stock: 92, category: "Condimentos", color: "bg-red-100" },
  { id: 29, name: "Salsa Ají Mágico", sku: "GR053", price: 3.20, stock: 92, category: "Condimentos", color: "bg-red-100" },
];

export default function POSPage() {

  const { cart, addToCart, updateQty, removeItem, clearCart } = useCartStore();

  const total = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  }, [cart]);

  const igv = total * 0.0; // Según tu lógica actual es 0
  const subtotal = total - igv;
  
  return (
    <div className='flex flex-col h-full gap-5 w-full overflow-hidden'>
      <POSHeader/>
      <div className='flex h-full overflow-hidden'>
        <ProductGrid products={products} onAddCart={addToCart}/>
        <OrderSumary cart={cart} subtotal={subtotal} igv={igv} total={total} OnRemoveItem={removeItem} onUpdateQty={updateQty} onClearCart={clearCart}/>
      </div>
    </div>
  )
}
