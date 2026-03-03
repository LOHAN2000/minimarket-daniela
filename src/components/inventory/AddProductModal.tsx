import { useAuthStore } from '@/store/useAuthStore'
import { useProductStore } from '@/store/useProductStore';
import { X, Box, Truck, LoaderCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { newCategory, newProduct } from '../../../types';
import { toast } from 'sonner';

export const AddProductModal = () => {
  const { user } = useAuthStore();
  const { fetchCategories, categories, createCategory, fetchSupplierRuc, supplierSunatApi, fetchSuppliers, suppliers, createSupplier, isLoadingSupplierSearch, isLoadingSupplierCreate, clearSunatApi, createProduct, error, isLoadingProduct } = useProductStore();

  const [ newCategory, setNewCategory ] = useState<newCategory>({ name: ''});
  const [ searchSupplier, setSearchSupplier ] = useState('');
  const [ newProduct, setNewProduct ] = useState<newProduct>({
    name: '',
    barcode: '',
    categoryId: 0,
    costPrice: '',
    price: '',
    stock: '',
    supplierId: 0,
  });

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory) return;
    createCategory(newCategory);
    setNewCategory({name: ''});
  }

  const handleSearchSupplier = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchSupplier) return;
    await fetchSupplierRuc(searchSupplier);
    console.log(supplierSunatApi)
  }

  const handleCreateSupplier = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supplierSunatApi) return;

    const newSupplierData = {
      ruc: supplierSunatApi.numero_documento,
      bussinessName: supplierSunatApi.razon_social,
      address: supplierSunatApi.direccion,
      city: supplierSunatApi.distrito,
      region: supplierSunatApi.provincia,
    };
    
    await createSupplier(newSupplierData);
    setSearchSupplier('');
    clearSunatApi();
  };

  const handlerCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await createProduct(newProduct);

    const modal = document.getElementById('modal_add_product') as HTMLDialogElement | null;
    
    if (response.success) {
      modal?.close();
      setNewProduct({
        name: '',
        barcode: '',
        categoryId: 0,
        costPrice: '',
        price: '',
        stock: '',
        supplierId: 0,
      });
      toast.success('Producto creado correctamente');
    } else if (response.success == false) {
      toast.error('Error al crear el producto');
    }
  }

  useEffect(() => {
    fetchCategories();
    fetchSuppliers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const modal = document.getElementById('modal_add_product') as HTMLDialogElement;
    
    const handleClose = () => {
      useProductStore.setState({ error: null });
      setNewProduct({ name: '', barcode: '', categoryId: 0, costPrice: '', price: '', stock: '', supplierId: 0 });
      setNewCategory({ name: '' });
      setSearchSupplier('');
    };

    modal?.addEventListener('close', handleClose);
    return () => modal?.removeEventListener('close', handleClose);
  }, []);


  return (
    <dialog id="modal_add_product" className='modal'>
      {/* Colocamos el Toaster DENTRO del dialog para que se renderice en la misma capa (top-layer) */}
      <div className='modal-box p-6 rounded-2xl max-w-md md:max-w-3xl w-full bg-white shadow-xl custom-scrollbar'>
        <form method='dialog' className='absolute right-5 top-5'>
          <button className='text-gray-400 hover:text-red-600 transition-colors p-1 rounded-full hover:bg-red-50'>
            <X className='size-5'/>
          </button>
        </form>

        <div className='mb-6 border-b border-gray-100 pb-4'>
          <h1 className='text-xl font-bold text-slate-800 flex items-center gap-2'>
            <Box className="text-red-600" size={24} />
            Agregar Nuevo Producto
          </h1>
        </div>

        <form className='flex flex-col w-full space-y-6'>
          
          <div className='space-y-4'>
            <h2 className='text-sm font-bold text-red-600 tracking-wider uppercase'>1. Datos del Producto</h2>

            <div className='flex sm:flex-row flex-col w-full gap-4'>
              <div className='w-full group'>
                <label className='text-sm font-semibold text-slate-700 tracking-wide mb-1.5 block'>Nombre del Producto <span className="text-red-500">*</span></label>
                <input type='text' placeholder="Ej. Leche Evaporada" required name='name' onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} value={newProduct.name} className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all'/>
              </div>
              <div className='w-full group'>
                <label className='text-sm font-semibold text-slate-700 tracking-wide mb-1.5 block'>Código de Barras</label>
                <input type='text' placeholder="Ej. 775123456789" name='barcode' onChange={(e) => setNewProduct({...newProduct, barcode: e.target.value})} value={newProduct.barcode} className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all'/>
              </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 w-full'>
              <div className='flex-1 group'>
                <label className='text-sm font-semibold text-slate-700 tracking-wide mb-1.5 block'>Categoría <span className="text-red-500">*</span></label>
                <select name='categoryId' onChange={(e) => setNewProduct({...newProduct, categoryId: Number(e.target.value)})} value={newProduct.categoryId} className="select select-bordered w-full bg-white text-gray-700 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:bg-white transition-all duration-300">
                  <option value={0} disabled className="text-gray-400">Selecciona una categoría</option>
                  {categories?.map((item) => (
                    <option key={item.id} value={item.id} className='text-gray-700 bg-white'>{item?.name}</option>
                  ))}
                </select>
              </div>
              
              <div className='flex flex-col group'>
                <label className='text-sm font-semibold text-slate-700 tracking-wide mb-1.5 block'>Crear Categoría Rápida</label>
                <div className='flex gap-x-2'>
                  <input type='text' name='category' onChange={(e) => setNewCategory({name: e.target.value})} value={newCategory?.name} placeholder="Nueva categoría" className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all'/>
                  <button type='button' disabled={user?.role !== 'Admin'} onClick={handleCreateCategory} className='px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50'>Crear</button>
                </div>
              </div>
            </div>

            <div className='flex flex-col sm:flex-row w-full gap-4'>
              <div className='w-full group'>
                <label className='text-sm font-semibold text-slate-700 tracking-wide mb-1.5 block'>Costo (S/)</label>
                <input type='text' step="0.01" placeholder="0.00" name='costPrice' onChange={(e) => setNewProduct({...newProduct, costPrice: (e.target.value)})} value={newProduct.costPrice} className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all'/>
              </div>
              <div className='w-full group'>
                <label className='text-sm font-semibold text-slate-700 tracking-wide mb-1.5 block'>Precio Venta (S/)</label>
                <input type='text' step="0.01" placeholder="0.00" name='price' onChange={(e) => setNewProduct({...newProduct, price: (e.target.value)})} value={newProduct.price} className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all'/>
              </div>
              <div className='w-full group'>
                <label className='text-sm font-semibold text-slate-700 tracking-wide mb-1.5 block'>Stock Inicial</label>
                <input type='text' placeholder="0" name='stock' onChange={(e) => setNewProduct({...newProduct, stock: (e.target.value)})} value={newProduct.stock} className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all'/>
              </div>
            </div>

            <hr className="border-gray-100"/>

            <div className='space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-100'>
              <h2 className='text-sm font-bold text-slate-800 tracking-wider uppercase flex items-center gap-2'>
                <Truck size={16} className="text-slate-500"/> 
                2. Asignar Proveedor
              </h2>

              <div className='flex flex-col sm:flex-row w-full gap-4'>
                <div className='flex-1 group'>
                  <label className='text-sm font-semibold text-slate-700 tracking-wide mb-1.5 block'>Proveedor Existente</label>
                  <select name='supplierId' onChange={(e) => setNewProduct({...newProduct, supplierId: Number(e.target.value)})} value={newProduct.supplierId} className="select select-bordered w-full bg-white text-gray-700 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:bg-white transition-all duration-300">
                    <option value={0} disabled className="text-gray-400">Selecciona un proveedor</option>
                    {suppliers?.map((item) => (
                      <option key={item.id} value={item.id} className='text-gray-700 bg-white'>{item?.bussinessName}</option>
                    ))}
                  </select>
                </div>
                <div className='flex flex-col group'>
                  <label className='text-sm font-semibold text-slate-700 tracking-wide mb-1.5 block'>RUC de Proveedor Nuevo</label>
                  <div className='flex gap-x-2'>
                    <input placeholder="Ej. 20123456789" onChange={(e) => setSearchSupplier(e.target.value)} value={searchSupplier} className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all bg-white'/>
                    <button type='button' disabled={searchSupplier.length < 11} onClick={handleSearchSupplier} className='px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50'>{isLoadingSupplierSearch ? <LoaderCircle className='animate-spin text-slate-700 w-full'/> : 'Buscar'}</button>
                  </div>
                </div> 
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                <div className='col-span-1 sm:col-span-2 lg:col-span-3'>
                  <label className='text-sm font-semibold text-slate-700 tracking-wide mb-1.5 block'>Razón Social</label>
                  <input type='text' disabled value={supplierSunatApi?.razon_social} className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-500'/>
                </div>
                <div>
                  <label className='text-sm font-semibold text-slate-700 tracking-wide mb-1.5 block'>Dirección</label>
                  <input type='text' disabled value={supplierSunatApi?.direccion} className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-500'/>
                </div>
                <div>
                  <label className='text-sm font-semibold text-slate-700 tracking-wide mb-1.5 block'>Distrito</label>
                  <input type='text' disabled value={supplierSunatApi?.distrito} className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-500'/>
                </div>
                <div>
                  <label className='text-sm font-semibold text-slate-700 tracking-wide mb-1.5 block'>Condición</label>
                  <input type='text' disabled value={supplierSunatApi?.condicion} className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-500'/>
                </div>
                </div>
                <div className='flex justify-end pt-2'>
                    <button type='button' disabled={!supplierSunatApi && user?.role !== 'admin'} onClick={handleCreateSupplier} className='flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 shadow-sm'>{isLoadingSupplierCreate ? <LoaderCircle className='animate-spin text-slate-700 w-full'/> : 'Agregar Proveedor'}</button>
                </div>
            </div>

            <div className="flex pt-4 mt-6 border-t border-gray-100 space-x-3">
              {error && (
                <div className='flex truncate text-sm text-red-400 items-center'>
                  {error}
                </div>
              )}
              <div className='flex gap-4 ms-auto'>
                <button type='button' onClick={() => {const modal = document.getElementById('modal_add_product') as HTMLDialogElement; modal?.close();}} className='flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors'>Cancel</button>
                <button type='submit' disabled={isLoadingProduct || user?.role !== 'Admin' || !newProduct.name || !newProduct.barcode || !newProduct.categoryId || !newProduct.costPrice || !newProduct.price || !newProduct.stock} onClick={handlerCreateProduct} className='flex items-center gap-2 min-w-35 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-bold transition-all shadow-md shadow-red-600/20 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden'>{isLoadingProduct ? <LoaderCircle className='animate-spin text-white w-full'/> : 'Crear Producto'}</button>
              </div>
            </div>

          </div>
        </form>
      </div>
      {/* BACKDROP PARA CERRAR AL HACER CLIC AFUERA */}
      <form method="dialog" className="modal-backdrop bg-slate-900/20 backdrop-blur-sm">
        <button>Cerrar</button>
      </form>
    </dialog>
  )
}

