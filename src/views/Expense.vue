<template>
  <div class="table">
    <goods-table-action
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
import { Expense as IExpense } from "@/api/models";
import { Supplier as ISupplier, Product as IProduct } from "@/api/models";
import { headers } from "@/api/models";
// component
import GoodsTableAction from "@/components/Goods/GoodsTableAction.vue";
// api
import api from "@/api/index";

interface ITable<T> {
  items: Array<T>;
  headers: Array<string>;
  totalPages: number;
}

export default defineComponent({
  components: { GoodsTableAction },
  name: "Expense",
  data() {
    return {
      headers: headers.expense,
      desserts: [] as Array<IExpense>,
      totalPages: 0,
      page: 1,
      contractors: {
        items: [] as Array<ISupplier>,
        totalPages: 0,
        headers: headers.customer,
      } as ITable<ISupplier>,
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
    setDesserts(desserts: Array<IExpense>) {
      desserts.forEach((dessert) => {
        dessert["date"] = new Date(dessert["date"])
          .toLocaleString()
          .slice(0, 10);
      });
      this.desserts = desserts;
    },
    setTotalPages(total: number) {
      this.totalPages = (total - total % 10) / 10;
      if (total % 10 != 0) {total +=1}
    },
    async updateData(page = 1) {
      const data = await api.expense.getByPage(page);
      this.setDesserts(data.documents_info);
      this.setTotalPages(data.total);
    },
    addItem(item: any) {
      let goods = [];
      for (const product of item.products){
        goods.push({
          product_id: product.id,
          quantity: product.quantity,
          price: product.price,
        })
      }
      const expense_document: IExpense = {
        number: item.document_number,
        customer_id: item.contractor.id,
        goods: goods,
        date: item.date.toISOString().split('T')[0],
      }
      api.expense.add(expense_document).then(
        () => {
          this.updateData(this.page);
        },
        (error: unknown) =>
          console.warn("Function addItem in Expense.vue", error)
      );
    },
    editItem(data: { id: number; item: IExpense }) {
      api.expense.change(data.id, data.item).then(
        () => {
          this.updateData(this.page);
        },
        (error: unknown) =>
          console.warn("Function EditItem in Expense.vue", error)
      );
    },
    removeItem(document_number: number) {
      api.expense.remove(document_number).then(
        () => {
          this.updateData(this.page);
        },
        (error: unknown) =>
          console.warn("Function removeItem in Expense.vue", error)
      );
    },
    setContractorsItems(item: Array<ISupplier>) {
      this.contractors.items = item;
    },
    setContractorsTotalPages(total: number) {
      this.contractors.totalPages = (total - total % 10) / 10;
      if (total % 10 != 0) {this.contractors.totalPages +=1}
    },
    async updateContractors(page = 1) {
      const data = await api.customer.getByPage(page);
      this.setContractorsItems(data.customers);
      this.setContractorsTotalPages(data.total);
    },
    setProducts(item: Array<IProduct>) {
      this.products.items = item;
    },
    setProductTotalPages(total: number) {
      this.products.totalPages = (total - total % 10) / 10
      if (total % 10 != 0) { this.products.totalPages += 1}
    },
    async updateProducts(page = 1) {
      const data = await api.product.getByPage(page);
      this.setProducts(data.products);
      this.setProductTotalPages(data.total);
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
