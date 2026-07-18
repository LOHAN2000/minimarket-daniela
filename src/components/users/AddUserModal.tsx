"use client"
import { useUserStore } from '@/store/useUserStore'
import { Loader2, UserPlus2, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { User } from '../../../types';
import { toast } from 'sonner';

interface Props {
  user:  User | null | undefined;
}

export const AddUserModal = ({ user }: Props) => {
  
  const { error, createUser, isLoadingUpdateUser,  isLoadingCreateUser, updateUser } = useUserStore();
  const [ formData, setFormData ] = useState<User>();

  useEffect(() => {
    if (user?.id) {
      console.log("es un edit")
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        id: user.id || null,
        name: user.name || '',
        lastName: user.lastName || '',
        username: user.username || '',
        email: user.email || '',
        password: '',
        role: user.role || 'Cajero',
      })
    } else {
      setFormData({
        name: '',
        lastName: '',
        username: '',
        email: '',
        role: 'Cajero',
        password: ''
      })
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const modal = document.getElementById('modal_add_user') as HTMLDialogElement;
    if (!formData) return;
    if (user?.id) {
      const response = await updateUser(user.id, formData);
      modal?.close();
      toast.success(response.success ? 'Usuario actualizado correctamente' : 'Error al actualizar el usuario');
    } else {
      const response = await createUser(formData);
      modal?.close();
      if (response.success) {
        toast.success('Usuario creado correctamente');
      }
    }
  }

  return (
    <dialog id='modal_add_user' className='modal'>
      <div className='modal-box p-4 rounded-xl max-w-md md:max-w-xl w-full bg-white shadow-xl'>
        <form method='dialog' className='absolute right-3 top-3'>
          <button className='text-gray-400 p-1 cursor-pointer'>
            <X className='size-5'/>
          </button>
        </form>
        <div className='flex flex-row items-center gap-2 mb-4'>
          <UserPlus2 size={20} className='text-red-500'/>
          <h1 className='font-bold'>{user?.id ? "Editar Usuario" : "Nuevo Usuario"}</h1>
        </div>
        <form className='flex flex-col space-y-2 h-full'>
          <div className='flex flex-col sm:flex-row w-full gap-4'>
            <div className='w-full flex flex-col group'>
              <label className='text-sm font-semibold text-slate-700 tracking-wide ms-1 mb-1.5 block'>Nombre</label>
              <input value={formData?.name || ''} onChange={(e) => setFormData({...formData!, [e.target.name]: e.target.value})} type='text' name='name' className='w-full px-2 py-1 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-red-500 focus:ring-red-500 transition-all'/>
            </div>
            <div className='w-full flex flex-col group'>
              <label className='text-sm font-semibold text-slate-700 tracking-wide ms-1 mb-1.5 block'>Apellidos</label>
              <input value={formData?.lastName || ''} onChange={(e) => setFormData({...formData!, [e.target.name]: e.target.value})} type='text' name='lastName' className='w-full px-2 py-1 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-red-500 focus:ring-red-500 transition-all'/>
            </div>
          </div>
          <div className='w-full flex flex-col group'>
            <label className='text-sm font-semibold text-slate-700 tracking-wide ms-1 mb-1.5 block'>Nombre de Usuario</label>
            <input disabled={!!user?.id} value={formData?.username || ''} onChange={(e) => setFormData({...formData!, [e.target.name]: e.target.value})} type='text' name='username' className='w-full px-2 py-1 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-red-500 focus:ring-red-500 transition-all'/>
          </div>
          <div className='w-full flex flex-col group'>
            <label className='text-sm font-semibold text-slate-700 tracking-wide ms-1 mb-1.5 block'>Correo Electrónico</label>
            <input value={formData?.email || ''} onChange={(e) => setFormData({...formData!, [e.target.name]: e.target.value})} type='email' name='email' className='w-full px-2 py-1 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-red-500 focus:ring-red-500 transition-all'/>
          </div>
          <div className='flex flex-col sm:flex-row w-full gap-4'>
            <div className='flex flex-col w-full'>
              <label className='text-sm font-semibold text-slate-700 tracking-wide ms-1 mb-1.5 block'>Rol en el sistema</label>
              <select required value={formData?.role} onChange={(e) => setFormData({...formData!, [e.target.name]: e.target.value})} name='role' className='w-full px-2 py-1 border border-gray-300 rounded-sm text-sm bg-white text-gray-700 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all'>
                <option value='Admin' className='text-gray-700 bg-white'>Admin</option>
                <option value='Cajero' className='text-gray-700 bg-white'>Cajero</option>
              </select>
            </div>
            <div className='flex flex-col w-full'>
              <label className='text-sm font-semibold text-slate-700 tracking-wide ms-1 mb-1.5 block'>Contraseña</label>
              <input type='password' name='password' value={formData?.password || ''} onChange={(e) => setFormData({...formData!, [e.target.name]: e.target.value})} className='w-full px-2 py-1 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-red-500 focus:ring-red-500 transition-all'/>
            </div>
          </div>
          <div className='flex flex-col sm:flex-row h-7'>
            {error && (
              <div className='flex truncate text-sm text-red-400 items-center'>
                {error}
              </div>
            )}
            <div className='flex flex-row gap-2 justify-end w-full'>
              <button onClick={() => {const modal = document.getElementById('modal_add_user') as HTMLDialogElement; modal?.close();}} type='button' className='flex items-center gap-2 px-4 py2 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer'>Cancel</button>
              <button onClick={handleSubmit} disabled={!user?.id && (!formData?.name ||!formData?.lastName ||!formData?.username || !formData?.email || !formData?.role ||!formData?.password)} type='submit' className='flex items-center px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-red-600/20 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden cursor-pointer'>{isLoadingCreateUser || isLoadingUpdateUser ? <Loader2 className='animate-spin mx-auto size-auto py-5'/> : (user?.id ? 'Guardar Cambios' : 'Crear Usuario')}</button>
            </div>
          </div>
        </form>
      </div>
      <form method='dialog' className='modal-backdrop bg-slate-900/10 backdrop-brightness-75'>
        <button>Cerrar</button>
      </form>
    </dialog>
  )
}
