import React from 'react'
import { Product } from '../../../types';
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from '@/components/ui/dialog'
import { LoaderCircle } from 'lucide-react';
import { useProductStore } from '@/store/useProductStore';
import { toast } from 'sonner';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export const DeleteProductModal = ({ isOpen, onClose, product }: Props) => {

  const {isLoadingDeleteProduct, deleteProduct } = useProductStore();

  const handleDelete= async () => {
    if (!product) return;
    const result = await deleteProduct(product.id);
    if (result.success) {
      toast.success('Producto eliminado correctamente');
      onClose();
    } else {
      toast.error('Error al eliminar el producto');
    }
  };

  console.log(product)
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent  className='max-w-sm'>
        <DialogHeader>
          <DialogTitle className='text-xl'>Eliminar Producto</DialogTitle>
        </DialogHeader>
        <p className='text-md text-gray-600'>¿Eliminar <span className='font-semibold text-slate-800'>{product?.name}?</span></p>
        <DialogFooter className='gap-2'>
          <button onClick={onClose} className='px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50'>
            Cancelar
          </button>
          <button onClick={handleDelete} disabled={isLoadingDeleteProduct} className='flex items-center justify-center min-w-25 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-bold disabled:opacity-50'>
            {isLoadingDeleteProduct ? <LoaderCircle className='animate-spin size-4'/> : 'Eliminar'}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
