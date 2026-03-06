import React from 'react'

export const TableRowSkeleton = () => {
  return (
    <tr className="flex w-full animate-pulse">
      <td className="px-6 py-4 w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gray-200 shrink-0" />
          <div className="h-3 bg-gray-200 rounded w-32" />
        </div>
      </td>
      <td className="px-6 py-4 text-center w-full">
        <div className="h-6 bg-gray-200 rounded-full w-24 mx-auto" />
      </td>
      <td className="px-6 py-4 text-center w-full">
        <div className="h-3 bg-gray-200 rounded w-8 mx-auto" />
      </td>
      <td className="px-6 py-4 text-center w-full">
        <div className="h-3 bg-gray-200 rounded w-16 mx-auto" />
      </td>
      <td className="px-6 py-4 text-center w-full">
        <div className="h-3 bg-gray-200 rounded w-16 mx-auto" />
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-5 h-5 rounded bg-gray-200" />
          <div className="w-5 h-5 rounded bg-gray-200" />
        </div>
      </td>
    </tr>
  );
}