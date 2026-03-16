"use client"
import { useAuthStore } from '@/store/useAuthStore';
import { useSalesStore } from '@/store/useSalesStore';
import { ArrowLeft, Loader2Icon, Printer, ShoppingBag } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react'
import { useReactToPrint } from 'react-to-print';

export default function Ticketpage() {

  const { user } = useAuthStore();
  const { getTicket, ticket, isLoadingTicket } = useSalesStore();

  const params = useParams();

  const router = useRouter();
  const ticketId = params.ticketId as string;

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ticketId) {
      getTicket(ticketId);
    }
  }, [getTicket, ticketId, user]);


  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: `Ticket-${ticketId}`,
    onAfterPrint: () => {
      router.back();
    },
    pageStyle: `
      @page {
        style: 80mm auto;
        size: 80mm;
        margin: 0mm;
      }
      @media print {
        body{
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }`
  });

  if (isLoadingTicket) {
    return <div className="min-h-screen flex items-center justify-center font-mono"><Loader2Icon size={50} className="animate-spin"/></div>;
  }

  if (!ticket && !isLoadingTicket) {
    return <div className="min-h-screen flex items-center justify-center font-mono">No se encontró el ticket.</div>;
  }

  return (
    <div className='min-h-screen bg-gray-900 flex flex-col items-center py-10'>
      <div className='w-full max-w-[80mm] flex justify-between mb-6 print:hidden'>
        <button onClick={() => router.back()} className='text-white flex items-center gap-2 hover:text-gray-300 transition-colors text-sm font-medium'><ArrowLeft size={16}/> Volver</button>
        <button onClick={() => handlePrint()} className='bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg transition-all hover:scale-105'> <Printer size={18}/> Imprimir</button>
      </div>

      <div ref={contentRef} id='ticket-area' className='bg-white w-[80mm] px-4 py-6 text-black font-mono text-[12px] leading-tight shadow-2xl print:shadow-none mx-auto'>
        <div className='text-center mb-4'>
          <div className='flex justify-center mb-2'>
            <ShoppingBag size={28} className='text-black' strokeWidth={1.5}/>
          </div>
          <h1 className='text-xl font-extrabold uppercase tracking-tight mb-1'>Minimarket Daniela</h1>
          <p>Jr. Libertad 590, Huancayo</p>
          <p>Telf: (064) 234-567</p>
          <p className="mt-2 text-[14px] font-bold uppercase">Ticket de Venta</p>
        </div>
      </div>

    </div>    
  );
}