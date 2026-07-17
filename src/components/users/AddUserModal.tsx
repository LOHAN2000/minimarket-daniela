import { UserPlus2, X } from 'lucide-react'
import React from 'react'

export const AddUserModal = () => {
  return (
    <dialog id='modal_add_user' className='modal'>
      <div className='modal-box p-4 rounded-xl max-w-md md:max-w-xl w-full bg-white shadow-xl'>
        <form method='dialog' className='absolute right-5 top-5'>
          <button className='text-gray-400 p-1'>
            <X className='size-5'/>
          </button>
        </form>
        <div className='flex flex-row items-center gap-2 mb-4'>
          <UserPlus2 size={20} className='text-red-500'/>
          <h1 className='font-bold'>Nuevo Usuario</h1>
        </div>
      </div>
      <form method='dialog' className='modal-backdrop bg-slate-900/10 backdrop-brightness-75'>
        <button>Cerrar</button>
      </form>
    </dialog>
  )
}
