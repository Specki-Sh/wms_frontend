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
    "closing_balance_total_cost",
  ]
};


interface ProductInfo {
  name: string;
  code: string;
  unit: string;

}

interface ProductCard extends ProductInfo {
  id: number;
}

interface GoodsCharacteristic {
  quantity: number;
  cost?: number;
  price: number;
}

interface Goods extends GoodsCharacteristic {
  product_id: number;
}

interface WarehouseProduct {
  id: number;
  product_id: number;
  quantity: number;
  price: number;
  total_cost: number;
}

interface WarehouseProductExpanded extends WarehouseProduct, ProductInfo {
}

interface WarehousePaginate {
  products: Array<WarehouseProductExpanded>;
  total: number;
}

interface ProductsPaginate {
  product: Array<ProductCard>;
  total: number;
}

interface Contractor {
  name: string;
  TIN: string;
}

interface Customer extends Contractor {
  id: number;
}

interface Supplier extends Contractor {
  id: number;
}

interface CustomerPaginate {
  customers: Array<Customer>;
  total: number;
}

interface SupplierPaginate {
  suppliers: Array<Supplier>;

}

interface DocumentInfo {
  number: number;
  date: Date;
}

interface DocumentInfoPaginate {
  documents_info: Array<DocumentInfo>;
  total: number;
}

interface MaterialState {
  quantity: number;
  total_cost: number;
}

interface MaterialReportRow {
  product_info: ProductInfo;
  beginning_balance: MaterialState;
  closing_balance: MaterialState;
  acceptance: GoodsCharacteristic;
  expense: GoodsCharacteristic;
}

interface MaterialReport {
  data: Array<MaterialReportRow>;
}

