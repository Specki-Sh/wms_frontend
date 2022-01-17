export interface Product {
  id: number;
  name: string;
  code: string;
  unit: string;
  price: number;
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

export interface Receipt {
  id: number;
  supplier_id: number;
  product_id: number;
  quantity: number;
  price: number;

  supplier?: string;
  product?: string;
}

export interface Expense {
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
  receipts: Array<Receipt>;
  date: Date | string;
}

export interface Dispatch {
  id: number;
  document_number: number;
  expenses: Array<Expense>;
  date: Date | string;
}

export interface Report {
  id: number;
  product: Product;
  product_name: string;
  product_unit: string;
  product_price: number;
  opening_balance: number;
  receipt: number;
  expense: number;
  closing_balance: number;
}

export const headers: { [key: string]: Array<string> } = {
  product: ["id", "name", "code", "unit", "price"],
  customer: ["id", "name", "ITIN"],
  supplier: ["id", "name", "TIN"],
  receipt: [
    "id",
    "acceptance_id",
    "supplier_id",
    "product_id",
    "quantity",
    "price",
  ],
  expense: [
    "id",
    "acceptance_id",
    "customer_id",
    "product_id",
    "quantity",
    "price",
  ],
  warehouse: ["id", "product_id", "quantity"],
  acceptance: ["id", "document_number", "date"],
  dispatch: ["id", "document_number", "date"],
  report: [
    "product_name",
    "product_unit",
    "product_price",
    "opening_balance",
    "receipt",
    "expense",
    "closing_balance",
  ],
};
