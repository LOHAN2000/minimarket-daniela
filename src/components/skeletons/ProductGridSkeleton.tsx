import React from 'react'

export const ProductGridSkeleton = () => {
  return (
    <div className='bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col justify-between h-40 animate-pulse'>
      <div>
        <div className='h-6 bg-gray-200 rounded w-3/4 mb-2 mt-2'></div>
        <div className='h-4 bg-gray-200 rounded w-1/2'></div>
      </div>
      <div className='flex justify-between items-end mt-2'>
        <div>
          <div className='h-4 bg-gray-200 rounded w-12 mb-1'></div>
          <div className='h-6 bg-gray-200 rounded w-20'></div>
        </div>
        <div className="bg-gray-200 w-9 h-9 rounded-lg"></div>
      </div>
    </div>    
  )
};
