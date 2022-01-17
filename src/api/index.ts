import instance from "./instance";

import productModule from "./module/product";
import warehouseModule from "./module/warehouse";
import supplierModule from "./module/supplier";
import customerModule from "./module/customer";
import receiptModule from "./module/receipt";
import expenseModule from "./module/expense";
import acceptanceModule from "./module/acceptance";
import dispatchModule from "./module/dispatch";
import reportModule from "./module/report";

const api: { [index: string]: any } = {
  product: productModule(instance),
  warehouse: warehouseModule(instance),
  supplier: supplierModule(instance),
  customer: customerModule(instance),
  receipt: receiptModule(instance),
  expense: expenseModule(instance),
  acceptance: acceptanceModule(instance),
  dispatch: dispatchModule(instance),
  report: reportModule(instance),
};

export default api;
