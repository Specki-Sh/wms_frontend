import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Product from "../views/Product.vue";
import Contractors from "../views/contractors/Contractors.vue";
import Customer from "../views/contractors/Customer.vue";
import Supplier from "../views/contractors/Supplier.vue";
import DeliveredProduct from "../views/DeliveredProduct.vue";
import DispatchedProduct from "../views/DispatchedProduct.vue";
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
    path: "/product",
    name: "product",
    component: Product,
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
    path: "/delivered_product",
    name: "DeliveredProduct",
    component: DeliveredProduct,
  },
  {
    path: "/dispatched_product",
    name: "DispatchedProduct",
    component: DispatchedProduct,
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
