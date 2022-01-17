<template>
  <div class="table">
    <expense-receipt-table-action
      :headers="headers"
      :desserts="desserts"
      @add="addItem($event)"
      @edit="editItem($event)"
      @remove="removeItem($event)"
      @update:Contractors="updateContractors($event)"
      @update:Products="updateProducts($event)"
    />
    <va-pagination
      class="pagination"
      v-model="page"
      :pages="totalPages"
      input
    />
  </div>
</template>

<script lang="ts">
// vue
import { defineComponent, computed } from "vue";
// Models
import { Dispatch as IDispatch } from "@/api/models";
import { Customer as ICustomer, Product as IProduct } from "@/api/models";
import { headers } from "@/api/models";
// component
import ExpenseReceiptTableAction from "@/components/ExpenseReceipt/ExpenseReceiptTableAction.vue";
// api
import api from "@/api/index";

interface ITable<T> {
  items: Array<T>;
  headers: Array<string>;
  totalPages: number;
}

export default defineComponent({
  components: { ExpenseReceiptTableAction },
  name: "Dispatch",
  data() {
    return {
      headers: headers.dispatch,
      desserts: [] as Array<IDispatch>,
      totalPages: 0,
      page: 1,
      contractors: {
        items: [] as Array<ICustomer>,
        totalPages: 0,
        headers: headers.customer,
      } as ITable<ICustomer>,
      products: {
        items: [] as Array<IProduct>,
        totalPages: 0,
        headers: headers.product,
      } as ITable<IProduct>,
    };
  },
  provide() {
    return {
      contractors: computed(() => this.contractors),
      products: computed(() => this.products),
    };
  },
  methods: {
    setDesserts(desserts: Array<IDispatch>) {
      desserts.forEach((dessert) => {
        dessert["date"] = new Date(dessert["date"])
          .toLocaleString()
          .slice(0, 10);
      });
      this.desserts = desserts;
    },
    setTotalPages(pages: number) {
      this.totalPages = pages;
    },
    async updateData(page = 1) {
      const data = await api.dispatch.getByPage(page);
      this.setDesserts(data.items);
      this.setTotalPages(data._meta.total_pages);
    },
    addItem(item: IDispatch) {
      api.dispatch.add(item).then(
        () => {
          this.updateData(this.page);
        },
        (error: unknown) =>
          console.warn("Function addItem in Dispatch.vue", error)
      );
    },
    editItem(data: { id: number; item: IDispatch }) {
      api.dispatch.change(data.id, data.item).then(
        () => {
          this.updateData(this.page);
        },
        (error: unknown) =>
          console.warn("Function EditItem in Dispatch.vue", error)
      );
    },
    removeItem(id: number) {
      api.dispatch.remove(id).then(
        () => {
          this.updateData(this.page);
        },
        (error: unknown) =>
          console.warn("Function removeItem in Dispatch.vue", error)
      );
    },
    setContractorsItems(item: Array<ICustomer>) {
      this.contractors.items = item;
    },
    setContractorsTotalPages(pages: number) {
      this.contractors.totalPages = pages;
    },
    async updateContractors(page = 1) {
      const data = await api.customer.getByPage(page);
      this.setContractorsItems(data.items);
      this.setContractorsTotalPages(data._meta.total_pages);
    },
    setProducts(item: Array<IProduct>) {
      this.products.items = item;
    },
    setProductTotalPages(pages: number) {
      this.products.totalPages = pages;
    },
    async updateProducts(page = 1) {
      const data = await api.product.getByPage(page);
      this.setProducts(data.items);
      this.setProductTotalPages(data._meta.total_pages);
    },
  },
  watch: {
    page(newValue) {
      this.updateData(newValue);
    },
  },
  mounted() {
    this.updateData();
    this.updateProducts();
  },
});
</script>

<style>
.table {
  margin-top: 3rem;
  width: 100%;
}
.pagination {
  margin: auto;
}
</style>
