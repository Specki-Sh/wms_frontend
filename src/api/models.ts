export interface Product {
  id: number;
  name: string;
  code: string;
  unit: string;
}

export interface Warehouse {
  id: number;
  product_id: number;
  quantity: number;
  product?: string;
}

export interface Customer {
  id: number;
  inn: string;
  name: string;
}

export interface Supplier {
  id: number;
  inn: string;
  name: string;
}

export interface DeliveredProduct {
  id: number;
  supplier_id: number;
  product_id: number;
  quantity: number;
  price: number;

  supplier?: string;
  product?: string;
}

export interface DispatchedProduct {
  id: number;
  customer_id: number;
  product_id: number;
  quantity: number;
  price: number;

  customer?: string;
  product?: string;
}

export interface Acceptance {
  id: number;
  document_number: number;
  delivered_products: Array<DeliveredProduct>;
  date: Date | string;
}

export interface Expense {
  id: number;
  document_number: number;
  dispatched_products: Array<DispatchedProduct>;
  date: Date | string;
}

export interface Report {
  id: number;
  product: Product;
  product_name: string;
  product_unit: string;
  product_price: number;
  opening_balance: number;
  delivered_product: number;
  dispatched_product: number;
  closing_balance: number;
}

export interface baseTable extends Product, Warehouse, Supplier, Customer, DispatchedProduct, DeliveredProduct, DeliveredProduct{
}

export const headers: { [key: string]: Array<string> } = {
  product: ["id", "name", "code", "unit"],
  customer: ["id", "name", "TIN"],
  supplier: ["id", "name", "TIN"],
  delivered_product: [
    "id",
    "acceptance_id",
    "supplier_id",
    "product_id",
    "quantity",
    "price",
  ],
  dispatched_product: [
    "id",
    "acceptance_id",
    "customer_id",
    "product_id",
    "quantity",
    "price",
  ],
  warehouse: ["id", "product_id", "quantity"],
  acceptance: ["id", "document_number", "date"],
  expense: ["id", "document_number", "date"],
  report: [
    "product_name",
    "product_unit",
    "product_price",
    "opening_balance",
    "delivered_product",
    "dispatched_product",
    "closing_balance",
  ],
};
