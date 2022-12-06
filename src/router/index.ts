import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Product from "../views/Product.vue";
import Contractors from "../views/contractors/Contractors.vue";
import Customer from "../views/contractors/Customer.vue";
import Supplier from "../views/contractors/Supplier.vue";
import DeliveredProduct from "../views/DeliveredProduct.vue";
import Expense from "../views/Expense.vue";
import Acceptance from "../views/Acceptance.vue";
import Dispatch from "../views/Dispatch.vue";
import Report from "../views/Report.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Home",
    name: "Home",
    component: Home,
  },
  {
    path: "/product",
    name: "product",
    component: Product,
  },
  {
    path: "/contractors",
    name: "Contractors",
    component: Contractors,
  },
  {
    path: "/contractors/customer",
    name: "Customer",
    component: Customer,
  },
  {
    path: "/contractors/supplier",
    name: "Supplier",
    component: Supplier,
  },
  {
    path: "/delivered_product",
    name: "DeliveredProduct",
    component: DeliveredProduct,
  },
  {
    path: "/expense",
    name: "Expense",
    component: Expense,
  },
  {
    path: "/acceptance",
    name: "Acceptance",
    component: Acceptance,
  },
  {
    path: "/dispatch",
    name: "Dispatch",
    component: Dispatch,
  },
  {
    path: "/report",
    name: "Report",
    component: Report,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
