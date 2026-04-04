// Store 

export type StoreResult<T = void> = Promise<{
  success: boolean;
  data?: T;
  error?: string;
}>

// Login && User

export interface newUser {
  name: string,
  lastName: string,
  email: string,
  userName: string,
  password: string,
  role: string
}

export interface User {
  unique_name: string;
  LastName: string;
  Username: string;
  role: string;
  Email: string;
  nameid: number;
}

// Productos 

export interface Product {
  id: number;
  name: string;
  barcode: string;
  price: number;
  costPrice: number;
  stock: number;
  category: Category;
  categoryId: number;
  supplierId: number;
  supplier: string;
  createdAt: Date;
}

export interface UpdateProduct {
  name: string;
  barcode: string;
  price: string;
  costPrice: string;
  stock: string;
  categoryId: number;
  supplierId: number;
}


export interface newProduct {
  name: string;
  barcode: string;
  price: string;
  costPrice: string;
  stock: string;
  categoryId: number;
  supplierId: number;
}

export interface Category {
  id: number;
  name: string;
  createdAt: Date;
}

export interface newCategory {
  name: string;
}


// Proveedores

export interface SupplierApi {
  razon_social: string;
  numero_documento: string;
  estado: string;
  condicion: string;
  direccion: string;
  ubigeo: number;
  distrito: string;
  provincia: string;
  departamento: string;
}

export interface NewSupplier {
  ruc: string;
  bussinessName: string;
  address: string;
  city: string;
  region: string;
}

export interface Supplier {
  id: number;
  ruc: string;
  bussinessName: string;
  address: string;
  city: string;
  region: string;
  createdAt: Date;
}

// POS - carrito

export interface CartItem extends Product {
  qty: number;
}

// Sales

export interface CreateSaleDto {
  paymentMethod: string,
  userId: number,
  amountPaid: number,
  changeGiven: number,
  items: {
    productId: number,
    quantity: number;
  }[]
}

export interface SaleResponse {
  message: string;
  ticketCode: string;
  total: number;
  sale: Sale;
}

export interface Sale {
  ticketCode: string;
  total: number;
  paymentMethod: string;
  amountPaid: number,
  changeGiven: number,
  userId: number;
  user: User | null;
  saleDetails: SaleDetail[];
  id: number;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string | null;
  deletedBy: string;
  deletedAt: string | null;
  isDeleted: boolean;
}

export interface SaleDetail {
  saleId: number;
  sale: Sale | null;
  productId: number;
  product: Product | null;
  productName: string;
  quantity: number;
  unitPrice: number;
  subTotal: number;
  id: number;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string | null;
  deletedBy: string;
  deletedAt: string | null;
  isDeleted: boolean;
}

// Dashboard
export interface StatPeriod {
  ingresos: number,
  ingresosCambio: number;
  ventasCambio: number;
  ventasPromedio: number;
  productosBajos: number;
}

export interface DashboardData {
  daily: StatPeriod;
  weekly: StatPeriod;
  monthly: StatPeriod;
}