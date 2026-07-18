import { Loader2, UserRoundXIcon, X } from 'lucide-react';
import React from 'react'
import { User } from '../../../types';
import { useUserStore } from '@/store/useUserStore';
import { toast } from 'sonner';

interface Props {
  user: User | null;
}

export const DeleteUserModal = ({user}: Props) => {
  
  const { deleteUser, isLoadingDeleteUser } = useUserStore();

  const handleDelete = async () => {

    const modal = document.getElementById('modal_delete_user') as HTMLDialogElement;
    
    if (!user) return;
    const response = await deleteUser(user.id!);
    
    modal?.close();

    if (response.success) {
      toast.success('Usuario eliminado correctamente');
    } else {
      toast.error('Error al eliminar el usuario');
    }
  }

  return (
    <dialog id='modal_delete_user' className='modal'>
      <div className='modal-box p-4 rounded-xl max-w-md md:max-w-xl w-full bg-white shadow-xl'>
        <form method='dialog' className='absolute right-3 top-3'>
          <button className='text-gray-400 p-1 cursor-pointer'>
            <X className='size-5'/>
          </button>
        </form>
        <div className='flex flex-row items-center gap-2 mb-3'>
          <UserRoundXIcon size={20} className='text-red-500'/>
          <h1 className='font-bold '>Eliminar Usuario</h1>
        </div>
        <div className='flex'>
          <p className='text-md text-gray-600'>¿Eliminar a <span className='font-semibold text-slate-800'>{user?.username}?</span></p>
        </div>
        <div className='flex flex-row gap-2 justify-end w-full h-8'>
          <button onClick={() => {const modal = document.getElementById('modal_delete_user') as HTMLDialogElement; modal?.close();}} type='button' className='flex items-center gap-2 px-4 py2 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer'>Cancel</button>
          <button onClick={handleDelete} type='submit' className='flex items-center px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-red-600/20 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden cursor-pointer'>{isLoadingDeleteUser ? <Loader2 className='animate-spin mx-auto size-auto py-5'/> : <p className='flex text-center'>Eliminar</p>}</button>
        </div>
      </div>
      <form method='dialog' className='modal-backdrop bg-slate-900/10 backdrop-brightness-75'>
        <button>Cerrar</button>
      </form>
    </dialog>
  )
}
