"use client"
import { ArrowLeft, Printer, ShoppingBag } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print';

interface TicketData {
  id: string;
  fecha: string;
  items: { name: string; qty: number; price: number; sku: string}[];
  subtotal: number;
  igv: number;
  total: number;
  vuelto: number;
  pagoCon: number;
  cajero: string;
}

const getTicketData = (id: string): TicketData => {
  return {
    id: id,
    fecha: new Date().toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    items: [
      { name: "LECHE GLORIA AZUL 400G", qty: 2, price: 4.20, sku: "77501" },
      { name: "COCA COLA 3L ORIGINAL", qty: 1, price: 11.50, sku: "77505" },
      { name: "PAN DE MOLDE BIMBO", qty: 1, price: 5.80, sku: "77507" },
    ],
    subtotal: 21.78,
    igv: 3.92,
    total: 25.70,
    pagoCon: 50.00,
    vuelto: 24.30,
    cajero: "DANIELA ADMIN",
  };
};

export default function Ticketpage() {

  const params = useParams();
  const router = useRouter();
  const ticketId = params.ticketId as string;

  const ticket = ticketId ? getTicketData(ticketId) : null;

  const contentRef = useRef<HTMLDivElement>(null);


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
        }
      }`
  });

  if (!ticket) return <div className="min-h-screen flex items-center justify-center font-mono">Cargando...</div>;

  return (
    // FONDO GRIS OSCURO PARA RESALTAR EL TICKET EN PANTALLA
    <div className="min-h-screen bg-gray-800 flex flex-col items-center py-10">
      
      {/* BOTONES DE CONTROL (Se ocultan al imprimir) */}
      <div className="w-full max-w-75 flex justify-between mb-6">
        <button 
          onClick={() => router.back()}
          className="text-white flex items-center gap-2 hover:text-gray-300 transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} /> Volver
        </button>
        <button 
          onClick={() => handlePrint()}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg transition-all hover:scale-105"
        >
          <Printer size={18} /> IMPRIMIR
        </button>
      </div>

      <div 
        ref={contentRef} 
        id="ticket-area"
        className="bg-white w-75 p-4 shadow-2xl text-black font-mono text-[11px] leading-tight print:shadow-none"
      >
        
        <div className="text-center mb-3">
          <div className="flex justify-center mb-1">
             {/* Icono simple o logo en blanco y negro */}
            <ShoppingBag size={20} className="text-black"/>
          </div>
          <h2 className="text-lg font-bold uppercase mb-1">Minimarket Daniela</h2>
          <p>RUC: 20601234567</p>
          <p>Av. Principal 123, Lima</p>
          <p>Telf: (01) 234-5678</p>
        </div>

        <div className="border-t border-dashed border-black py-2 mb-1">
            <div className="flex justify-between">
                <span>Fecha:</span>
                <span>{ticket.fecha}</span>
            </div>
            <div className="flex justify-between">
                <span>Ticket:</span>
                <span className="font-bold">#{ticket.id}</span>
            </div>
            <div className="flex justify-between">
                <span>Cajero:</span>
                <span>{ticket.cajero}</span>
            </div>
        </div>

        <div className="border-t border-dashed border-black py-2">
            {/* Encabezados */}
            <div className="flex font-bold mb-1">
                <span className="w-[10%]">C.</span>
                <span className="w-[65%]">PRODUCTO</span>
                <span className="w-[25%] text-right">TOTAL</span>
            </div>

            <div className="flex flex-col gap-1">
                {ticket.items.map((item, i) => (
                    <div key={i}>
                        <div className="flex">
                            <span className="w-[10%] align-top">{item.qty}</span>
                            <span className="w-[65%] uppercase leading-none">{item.name}</span>
                            <span className="w-[25%] text-right align-top">
                                {(item.qty * item.price).toFixed(2)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="border-t border-dashed border-black mt-2 pt-2 space-y-1">
            <div className="flex justify-between">
                <span>OP. GRAVADA</span>
                <span>S/ {ticket.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
                <span>I.G.V (18%)</span>
                <span>S/ {ticket.igv.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between text-base font-bold border-t border-black border-dashed mt-1 pt-1">
                <span>TOTAL</span>
                <span>S/ {ticket.total.toFixed(2)}</span>
            </div>
        </div>

        <div className="mt-2 pt-1 border-t border-dashed border-black space-y-1">
            <div className="flex justify-between">
                <span>EFECTIVO:</span>
                <span>S/ {ticket.pagoCon.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
                <span>VUELTO:</span>
                <span>S/ {ticket.vuelto.toFixed(2)}</span>
            </div>
        </div>

        <div className="text-center mt-4">
            <p className="font-bold text-[10px]">¡GRACIAS POR SU PREFERENCIA!</p>
        </div>

        <div className="h-6"></div>
      </div>

    </div>
  );
}