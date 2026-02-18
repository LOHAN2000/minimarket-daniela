"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

export default function Login() {

  const [ currentImage, setCurrentImage ] = useState(0);

  const backgroundImages = [
    '/login/verduras.jpg',
    '/login/pasillo.jpg',
    '/login/seccion-congelados.jpg',
    '/login/cafe.jpg'
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length)
    }, 6000)
    return () => clearInterval(timer);
  }, [backgroundImages.length])

  return (
    <div className='relative flex w-full h-full items-center justify-center overflow-hidden bg-slate-950'>
      <div className='absolute inset-0 z-10'>
        {backgroundImages.map((img, index) => (
          <div key={index} className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${currentImage === index ? 'opacity-100' : 'opacity-0'}`}>
            <Image src={img} fill className='object-cover scale-105' alt='Minimarket Daniela' priority={index === 0}/>
          </div>
        ))}
      </div>      
    </div>
  )
}
