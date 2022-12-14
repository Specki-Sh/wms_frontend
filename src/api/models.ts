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
  total_cost: number;
  product?: string;
}

export interface Customer {
  id: number;
  TIN: string;
  name: string;
}

export interface Supplier {
  id: number;
  TIN: string;
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

export interface Goods {
  product_id: number;
  quantity: number;
  price: number;
  product?: string;

}

export interface Acceptance {
  id?: number;
  number: number;
  goods: Array<Goods>;
  supplier_id: number;
  date: Date | string;
}

export interface Expense {
  id?: number;
  number: number;
  goods: Array<Goods>;
  customer_id: number;
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
  acceptance: ["number", "date"],
  expense: ["number", "date"],
  report: [
    "product_name",
    "product_code",
    "product_unit",
    "opening_balance_quantity",
    "opening_balance_total_cost",
    "acceptance_quantity",
    "acceptance_total_cost",
    "expense_quantity",
    "expense_total_cost",
    "closing_balance_quantity",
    "closing_balance_total_cost"
  ],
};
