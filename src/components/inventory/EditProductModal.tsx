import { Box, LoaderCircle, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Product, UpdateProduct } from '../../../types';
import { useAuthStore } from '@/store/useAuthStore';
import { useProductStore } from '@/store/useProductStore';
import { toast } from 'sonner';

interface Props {
  product: Product | null;
}

export const EditProductModal = ({ product }: Props) => {

  const { user } = useAuthStore();
  const { categories, suppliers, updateProduct, error, isLoadingUpdateProduct, fetchCategories, fetchSuppliers } = useProductStore();

  const [editProduct, setEditProduct] = useState<UpdateProduct>({
    name: '',
    barcode: '',
    categoryId: 0,
    costPrice: '',
    price: '',
    stock: '',
    supplierId: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    const response = await updateProduct(product.id, editProduct);
    const modal = document.getElementById('modal_edit_product') as HTMLDialogElement;

    if (response.success) {
      modal?.close();
      toast.success('Producto actualizado correctamente');
    } else {
      toast.error(response.error ?? 'Error al actualizar el producto');
    }
  }

  useEffect(() => {
    if (!product) return;
    setEditProduct({
      name: product.name,
      barcode: product.barcode,
      categoryId: product.categoryId ?? 0,
      costPrice: product.costPrice as unknown as string,
      price: product.price as unknown as string,
      stock: product.stock as unknown as string,
      supplierId: product.supplierId ?? 0,
    })
  }, [product])

  useEffect(() => {
    const modal = document.getElementById('modal_edit_product') as HTMLDialogElement;

    const handleClose = () => {
      useProductStore.setState({ error: null });
      setEditProduct({ name: '', barcode: '', categoryId: 0, costPrice: '', price: '', stock: '', supplierId: 0 });
    };

    modal?.addEventListener('close', handleClose);
    return () => modal?.removeEventListener('close', handleClose);
  }, []);

  useEffect(() => {
    fetchCategories();
    fetchSuppliers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <dialog id="modal_edit_product" className='modal'>
      <div className='modal-box p-6 rounded-2xl max-w-md md:max-w-3xl w-full bg-white shadow-xl custom-scrollbar'>
        <form method='dialog' className='absolute right-5 top-5'>
          <button className='text-gray-400 hover:text-red-600 transition-colors p-1 rounded-full hover:bg-red-50'>
            <X className='size-5'/>
          </button>
        </form>

        <div className='mb-6 border-b border-gray-100 pb-4'>
          <h1 className='text-xl font-bold text-slate-800 flex items-center gap-2'>
            <Box className="text-red-600" size={24} />
            Editar Producto
          </h1>
        </div>

        <form className='flex flex-col w-full space-y-6'>
          <div className='space-y-4'>
            <h2 className='text-sm font-bold text-red-600 tracking-wider uppercase'>Datos del Producto</h2>

            <div className='flex sm:flex-row flex-col w-full gap-4'>
              <div className='w-full'>
                <label className='text-sm font-semibold text-slate-700 tracking-wide mb-1.5 block'>Nombre <span className="text-red-500">*</span></label>
                <input type='text' value={editProduct?.name} onChange={(e) => setEditProduct({...editProduct!, name: e.target.value})} className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all'/>
              </div>
              <div className='w-full'>
                <label className='text-sm font-semibold text-slate-700 tracking-wide mb-1.5 block'>Código de Barras</label>
                <input type='text' value={editProduct?.barcode} onChange={(e) => setEditProduct({...editProduct!, barcode: e.target.value})} className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all'/>
              </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 w-full'>
              <div className='flex-1'>
                <label className='text-sm font-semibold text-slate-700 tracking-wide mb-1.5 block'>Categoría <span className="text-red-500">*</span></label>
                <select value={editProduct?.categoryId} onChange={(e) => setEditProduct({...editProduct!, categoryId: Number(e.target.value)})} className="select select-bordered w-full bg-white text-gray-700 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all">
                  <option value={0} disabled>Selecciona una categoría</option>
                  {categories?.map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
              <div className='flex-1'>
                <label className='text-sm font-semibold text-slate-700 tracking-wide mb-1.5 block'>Proveedor</label>
                <select value={editProduct?.supplierId} onChange={(e) => setEditProduct({...editProduct!, supplierId: Number(e.target.value)})} className="select select-bordered w-full bg-white text-gray-700 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all">
                  <option value={0} disabled>Selecciona un proveedor</option>
                  {suppliers?.map((item) => (
                    <option key={item.id} value={item.id}>{item.bussinessName}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className='flex flex-col sm:flex-row w-full gap-4'>
              <div className='w-full'>
                <label className='text-sm font-semibold text-slate-700 tracking-wide mb-1.5 block'>Costo (S/)</label>
                <input type='text' value={editProduct?.costPrice} onChange={(e) => setEditProduct({...editProduct!, costPrice: e.target.value})} className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all'/>
              </div>
              <div className='w-full'>
                <label className='text-sm font-semibold text-slate-700 tracking-wide mb-1.5 block'>Precio Venta (S/)</label>
                <input type='text' value={editProduct?.price} onChange={(e) => setEditProduct({...editProduct!, price: e.target.value})} className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all'/>
              </div>
              <div className='w-full'>
                <label className='text-sm font-semibold text-slate-700 tracking-wide mb-1.5 block'>Stock</label>
                <input type='text' value={editProduct?.stock} onChange={(e) => setEditProduct({...editProduct!, stock: e.target.value})} className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all'/>
              </div>
            </div>

            <div className="flex pt-4 mt-6 border-t border-gray-100 space-x-3">
              {error && (
                <div className='flex truncate text-sm text-red-400 items-center'>{error}</div>
              )}
              <div className='flex gap-4 ms-auto'>
                <button type='button' onClick={() => { const modal = document.getElementById('modal_edit_product') as HTMLDialogElement; modal?.close(); }} className='flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors'>
                  Cancelar
                </button>
                <button type='submit' disabled={isLoadingUpdateProduct || user?.role !== 'Admin' || !editProduct?.name || !editProduct.barcode || !editProduct.categoryId || !editProduct.costPrice || !editProduct.price || !editProduct.stock} onClick={handleSubmit} className='flex items-center justify-center min-w-40 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-bold transition-all shadow-md shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed'>
                  {isLoadingUpdateProduct ? <LoaderCircle className='animate-spin size-4'/> : 'Guardar Cambios'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <form method="dialog" className="modal-backdrop bg-slate-900/20 backdrop-blur-sm">
        <button>Cerrar</button>
      </form>
    </dialog>
  )
}
