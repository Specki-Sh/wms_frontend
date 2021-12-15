export interface Product {
  [index: string]: number | string;

  id: number;
  name: string;
  code: string;
  unit: string;
  price: number;
}

export interface Warehouse {
  [index: string]: number | string | undefined;

  id: number;
  product_id: number;
  quantity: number;
  product?: string;
}

export interface Customer {
  [index: string]: number | string;

  id: number;
  inn: string;
  name: string;
}

export interface Supplier {
  [index: string]: number | string;

  id: number;
  inn: string;
  name: string;
}

export interface Receipt {
  [index: string]: number | string | undefined;

  id: number;
  supplier_id: number;
  product_id: number;
  quantity: number;
  price: number;
  date: string;

  supplier?: string;
  product?: string;
}

export interface Expense {
  [index: string]: number | string | undefined;

  id: number;
  customer_id: number;
  product_id: number;
  quantity: number;
  price: number;
  date: string;

  customer?: string;
  product?: string;
}

export type baseTable = Product | Supplier | Customer;

export const headers: { [key: string]: string[] } = {
  product: ["id", "name", "code", "unit", "price"],
  customer: ["id", "name", "ITIN"],
  supplier: ["id", "name", "TIN"],
  receipt: ["id", "supplier", "product", "quantity", "price", "date"],
  expense: ["id", "customer", "product", "quantity", "price", "date"],
  warehouse: ["id", "product", "quantity"],
};
