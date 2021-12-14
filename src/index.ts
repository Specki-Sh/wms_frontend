import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Inventory from "../views/Inventory.vue";
import Contractors from "../views/contractors/Contractors.vue";
import Customer from "../views/contractors/Customer.vue";
import Supplier from "../views/contractors/Supplier.vue";
import Receipt from "../views/Receipt.vue";
import Expense from "../views/Expense.vue";
import Warehouse from "../views/Warehouse.vue";

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
    path: "/inventory",
    name: "inventory",
    component: Inventory,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
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
    path: "/receipt",
    name: "Receipt",
    component: Receipt,
  },
  {
    path: "/expense",
    name: "Expense",
    component: Expense,
  },
  {
    path: "/warehouse",
    name: "Warehouse",
    component: Warehouse,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
