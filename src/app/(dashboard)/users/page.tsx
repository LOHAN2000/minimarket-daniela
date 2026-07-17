"use client"
import { AddUserModal } from '@/components/users/AddUserModal';
import { useUserStore } from '@/store/useUserStore'
import { Edit, Loader2, Plus, Trash } from 'lucide-react'
import  { useEffect } from 'react'

export default function Users() {

  const { users, fetchUsers, isLoadingUsers } = useUserStore();
  
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers])
  
  return (
    <div className='flex flex-col w-full h-full overflow-hidden py-4'>

      <div className="flex flex-col sm:flex-row justify-between items-center px-1 mb-1">
        <div className='flex flex-col'>
          <h1 className='text-2xl font-bold text-gray-800'>Gestión de Usuarios</h1>
          <h1 className='text-sm text-gray-500'>Administra los accesos del Minimarket</h1>
        </div>
        <button onClick={() => {const modal = document.getElementById('modal_add_user') as HTMLDialogElement | null; modal?.showModal();}} className='flex flex-row items-center space-x-1 px-3 py-1.5 border border-red-400 rounded-lg text-white bg-red-500 hover:bg-red-600 font-semibold text-sm transition-colors cursor-pointer'><Plus size={18} className=''/><p>Nuevo Usuario</p></button>
      </div>

      <div className='bg-white shadow-sm rounded-xl border border-gray-200 flex flex-col flex-1 overflow-y-auto w-full'>
        <div className='overflow-x-auto'>
          <table className='w-full text-left border-collapse whitespace-nowrap'>
            <thead className='text-gray-500 text-sm font-semibold border-b border-gray-200 sticky top-0 z-10 bg-white'>
              <tr>
                <th className='px-4 py-4'>Usuario</th>
                <th className='px-6 py-4 text-center'>Nombre Completo</th>
                <th className='px-6 py-4 text-center'>Rol</th>
                <th className='px-6 py-4 ps-2 text-center'>Acciones</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {isLoadingUsers ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center">
                    <div className="flex justify-center">
                      <Loader2 className='animate-spin text-red-500' size={40}/>
                    </div>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-gray-500">
                    <p>No se encontraron usuarios.</p>
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className='hover:bg-red-50/50 transition-colors duration-200 group'>
                    <td className='px-6 py-3 text-gray-800 font-medium'>{user.username}</td>
                    <td className='px-6 py-3 text-center text-gray-600'><p className=''>{user.name} {user.lastName}</p></td>
                    <td className='px-6 py-3 text-center'><span className={`px-3 py-1 rounded-full text-xs font-bold ${user.role === 'Admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>{user.role || 'Cajero'}</span></td>
                    <td className='px-6 py-3 ps-2 flex justify-center gap-2'>
                      <button className='bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg p-1 transition-colors cursor-pointer'>
                        <Edit size={19}/>
                      </button>
                      <button className='p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors'>
                        <Trash size={19}/>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modales */}
      <AddUserModal/>
    </div>
  )
}
 