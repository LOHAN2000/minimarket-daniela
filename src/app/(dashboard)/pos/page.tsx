"use client"
import { OrderSumary } from '@/components/pos/OrderSumary';
import { POSHeader } from '@/components/pos/POSHeader'
import { ProductGrid } from '@/components/pos/ProductGrid'
import { useCartStore } from '@/store/useCartStore'
import { useProductStore } from "@/store/useProductStore";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from 'react';
import { toast, Toaster } from 'sonner';

export default function POSPage() {
  const { cart, addToCart, updateQty, removeItem, clearCart } = useCartStore();
  
  const { products, fetchProducts, isLoadingProducts } = useProductStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const router = useRouter()

  useEffect(() => {
    fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const total = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  }, [cart]);

  const categories = ["Todos", ...new Set(products.map(p => p.category?.name || "General"))];

  const igv = total * 0; 
  const subtotal = total - igv;
  
  const handleScan = (code: string) => {
    const product = products.find(p => p.barcode === code);
    if (product) {
      addToCart(product);
      toast.success(`Agregado: ${product.name}`);
    } else {
      toast.error("Producto no encontrado o código inválido");
    }
  }

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const catName = product.category?.name || "General";
      const matchCategory = selectedCategory === "Todos" || catName === selectedCategory;
      
      const lowerTerm = searchTerm.toLowerCase();
      // Buscamos por nombre o código de barras
      const matchSearch = product.name.toLowerCase().includes(lowerTerm) || (product.barcode && product.barcode.toLowerCase().includes(lowerTerm));
      
      return matchCategory && matchSearch;
    });
  }, [products, selectedCategory, searchTerm]);

  const handleProcessSale = () => {
    if(cart.length === 0) {
        toast.warning("El carrito está vacío");
        return;
    }

    toast.success("Venta procesada con éxito");
    
    const randomId = Math.floor(Math.random() * 9000) + 1000;
    const ticketId = `TICKET-${randomId}`;

    setTimeout(() => {
        router.push(`/pos/ticket/${ticketId}`);
        clearCart(); 
    }, 500); 
  }

  return (
    <div className='flex flex-col h-full gap-3 w-full overflow-hidden'>
      <Toaster />
      <POSHeader onScan={handleScan} onSearchChange={setSearchTerm} onFilterClick={() => setIsFiltersOpen(!isFiltersOpen)}/>
      
      <div className={`transition-all duration-300 ease-in-out ${isFiltersOpen ? "max-h-20 opacity-100 mb-1" : "max-h-0 opacity-0 mb-0"}`}>
        <div className='bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex items-center gap-2 overflow-x-auto custom-scrollbar'>
          <span className='text-xs font-bold text-gray-400 uppercase mr-2'>Categorías:</span>
          {categories.map((category) => (
            <button 
                key={category} 
                onClick={() => setSelectedCategory(category)} 
                className={`px-4 py-1.5 rounded-lg text-sm font-bold whitespace-nowrap transition-all border ${selectedCategory === category ? "bg-red-600 text-white border-red-600 shadow-md" : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"}`}
            >
                {category}
            </button>
          ))}
        </div>
      </div>

      <div className='flex h-full overflow-hidden gap-3'>
        <ProductGrid products={filteredProducts} onAddCart={addToCart} isLoading={isLoadingProducts}/>
        <OrderSumary cart={cart} subtotal={subtotal} igv={igv} total={total} OnRemoveItem={removeItem} onUpdateQty={updateQty} onClearCart={clearCart} onProcessSale={handleProcessSale}/>
      </div>
    </div>
  )
}