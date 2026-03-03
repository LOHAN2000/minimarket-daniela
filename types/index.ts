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
  UserName: string;
  role: string;
  Email: string;
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
  supplierId: number;
  supplier: string;
  createdAt: Date;
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
