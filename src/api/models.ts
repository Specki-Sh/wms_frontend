import supplier from "@/views/contractors/Supplier.vue";

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
  warehouse: ["id", "name", "code", "unit", "quantity", "price", "total_cost"],
  document_info: ["number", "date"],
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
    "closing_balance_total_cost",
  ]
};


export interface ProductInfo {
  name: string;
  code: string;
  unit: string;

}

export interface ProductCard extends ProductInfo {
  id: number;
}

export interface GoodsCharacteristic {
  quantity: number;
  cost?: number;
  price: number;
}

export interface Goods extends GoodsCharacteristic {
  product_id: number;
}

export interface WarehouseProduct {
  id: number;
  product_id: number;
  quantity: number;
  price: number;
  total_cost: number;
}

export interface WarehouseProductExpanded extends WarehouseProduct, ProductInfo {
}

export interface WarehousePaginate {
  products: Array<WarehouseProductExpanded>;
  total: number;
}

export interface ProductsPaginate {
  products: Array<ProductCard>;
  total: number;
}

export interface Contractor {
  name: string;
  TIN: string;
}

export interface Customer extends Contractor {
  id: number;
}

export interface Supplier extends Contractor {
  id: number;
}

export interface CustomerPaginate {
  customers: Array<Customer>;
  total: number;
}

export interface SupplierPaginate {
  suppliers: Array<Supplier>;

}

export interface DocumentInfo {
  number: number;
  date: Date | string;
}

export interface DocumentInfoPaginate {
  documents_info: Array<DocumentInfo>;
  total: number;
}

export interface MaterialState {
  quantity: number;
  total_cost: number;
}

export interface MaterialReportRow {
  product_info: ProductInfo;
  beginning_balance: MaterialState;
  closing_balance: MaterialState;
  acceptance: GoodsCharacteristic;
  expense: GoodsCharacteristic;
}

export interface MaterialReport {
  data: Array<MaterialReportRow>;
}

export interface DeliveredProduct extends Goods {
  id: number
}

export interface DispatchedProduct extends Goods {
  id: number
}

export interface ExpenseDocument extends DocumentInfo {
  customer_id: number
  goods: Array<Goods>
}

export interface AcceptanceDocument extends DocumentInfo {
  supplier_id: number
  goods: Array<Goods>
}
