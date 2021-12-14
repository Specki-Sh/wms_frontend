import instance from "./instance";

import productModule from "./module/product";
import warehouseModule from "./module/warehouse";
import supplierModule from "./module/supplier";
import customerModule from "./module/customer";
import receiptModule from "./module/receipt";
import expenseModule from "./module/expense";

const api: { [index: string]: any } = {
  product: productModule(instance),
  warehouse: warehouseModule(instance),
  supplier: supplierModule(instance),
  customer: customerModule(instance),
  receipt: receiptModule(instance),
  expense: expenseModule(instance),
};

export default api;
