"use client"
import { useAuthStore } from '@/store/useAuthStore';
import { useSalesStore } from '@/store/useSalesStore';
import { ArrowLeft, Loader2Icon, Printer } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react'
import { useReactToPrint } from 'react-to-print';

const numeroALetras = (numero : number) => {
  const entero = Math.floor(numero);
  const decimales = Math.round((numero - entero) * 100);
  return `SON: ${entero} Y ${decimales.toString().padStart(2, '0')}/100 SOLES`;
}

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

  const total = ticket?.total || 0;
  const opGravada = total / 1.18;
  const igv = total - opGravada;

  const totalItems = ticket?.saleDetails.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <div className='min-h-screen bg-gray-900 flex flex-col items-center py-10'>
      <div className='w-full max-w-[80mm] flex justify-between mb-6 print:hidden'>
        <button onClick={() => router.back()} className='text-white flex items-center gap-2 hover:text-gray-300 transition-colors text-sm font-medium'><ArrowLeft size={16}/> Volver</button>
        <button onClick={() => handlePrint()} className='bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg transition-all hover:scale-105'> <Printer size={18}/> Imprimir</button>
      </div>

      <div ref={contentRef} id='ticket-area' className='bg-white w-[80mm] px-4 py-6 text-black font-mono text-[12px] leading-tight shadow-2xl print:shadow-none mx-auto'>
        <div className='flex flex-col items-center text-center mb-4'>
          <div>
            <Image src={"/logo-minimarket-daniela.jpg"} alt="Logo Minimarket Daniela" width={110} height={64} style={{ objectFit: 'contain' }} loading="eager" priority/>
          </div>
          <p>Jr. Libertad 596, Huancayo</p>
          <p>R.U.C. 20605230092</p>
        </div>

        <div className='text-center border-t border-b border-dashed border-black py-2 mb-2'>
          <h3 className='font-bold text-[13px]'>BOLETA DE VENTA ELECTRÓNICA</h3>
          <p className='font-bold'>{ticket?.ticketCode}</p>
        </div>

        <div className='mb-2'>
          <div className='flex justify-between'>
            <span>FECHA:</span>
            <span>{ticket?.createdAt.toString().split("T")[0]}</span>
          </div>
          <div className='flex justify-between'>
            <span>Hora:</span>
            <span>{ticket?.createdAt.toString().split("T")[1].split(".")[0]}</span> 
          </div>
          <div className='flex justify-between'>
            <span>CAJERO:</span>
            <span>{user?.Username.toUpperCase()}</span>
          </div>
        </div>

        <div className='border-t border-dashed border-black py-2'>
          <div className='flex flex-col gap-2'>
            {ticket?.saleDetails.map((item, index) => (
              <div key={index} className='flex flex-col'>
                <span className='leading-none mb-0.5 font-bold truncate'>{item.productName}</span>
                <div className='flex justify-between'>
                  {item.quantity === 1 ? (
                    <span>{item.unitPrice.toFixed(2)}</span>
                  ) : (
                    <span>{item.quantity} x {item.unitPrice.toFixed(2)}</span>
                  )}
                  <span>{(item.quantity * item.unitPrice).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='border-t border-dashed border-black mt-2 pt-2 space-y-0.5'>
          <div className='flex justify-between'>
            <span>SUBTOTAL</span>
            <span>S/ {total.toFixed(2)}</span>
          </div>
          <div className="mb-2 text-[11px]">
              <span>{totalItems} UNIDAD(ES)</span>
          </div>
          <div className="flex justify-between">
              <span>OP. GRAVADA</span>
              <span>{opGravada.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
              <span>I.G.V.</span>
              <span>S/ {igv.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mt-1 pt-1 font-bold text-[14px]">
              <span>TOTAL A PAGAR</span>
              <span>S/ {total.toFixed(2)}</span>
          </div>
        </div>

        <div className='mt-2 text-[10px] font-bold'>
            <p>{numeroALetras(total)}</p>
        </div>

        <div className='mt-2 pt-1 border-t border-dashed border-black space-y-0.5'>
            <div className='flex justify-between'>
              <span>EFECTIVO</span>
              <span>S/ {ticket?.amountPaid.toFixed(2)}</span>
            </div>
            {ticket && ticket.changeGiven > 0 && (
              <div className='flex justify-between font-bold'>
                <span>VUELTO</span>
                <span>S/ {ticket.changeGiven.toFixed(2)}</span>
              </div>
            )}
        </div>

        <div className='text-center mt-5'>
          <p className="font-bold">¡GRACIAS POR SU COMPRA!</p>        
        </div>

        <div className="h-6"></div>
      </div>
    </div>    
  );
}
// TODO: corregir la hora, esta adelantado 5 horas