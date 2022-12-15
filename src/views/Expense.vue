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
import {
  Goods as IGoods,
  ExpenseDocument as IExpenseDocument,
  Customer as ICustomer,
  ProductCard as IProductCard,
  DocumentInfo as IDocumentInfo
} from "@/api/models";
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
      headers: headers.document_info,
      desserts: [] as Array<IDocumentInfo>,
      totalPages: 0,
      page: 1,
      contractors: {
        items: [] as Array<ICustomer>,
        totalPages: 0,
        headers: headers.customer,
      } as ITable<ICustomer>,
      products: {
        items: [] as Array<IProductCard>,
        totalPages: 0,
        headers: headers.product,
      } as ITable<IProductCard>,
    };
  },
  provide() {
    return {
      contractors: computed(() => this.contractors),
      products: computed(() => this.products),
    };
  },
  methods: {
    setDesserts(desserts: Array<IDocumentInfo>) {
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
      let goods: Array<IGoods> = [];
      for (const product of item.products){
        goods.push({
          product_id: product.id,
          quantity: product.quantity,
          price: product.price,
        })
      }
      const date: Array<string> = item.date.toLocaleDateString().split('/')
      const expense_document: IExpenseDocument = {
        number: item.document_number,
        customer_id: item.contractor.id,
        goods: goods,
        date: [date[2], date[0], date[1]].join('-'),
      }
      api.expense.add(expense_document).then(
        () => {
          this.updateData(this.page);
        },
        (error: unknown) =>
          console.warn("Function addItem in Expense.vue", error)
      );
    },
    editItem(data: { id: number; item: IExpenseDocument }) {
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
    setContractorsItems(item: Array<ICustomer>) {
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
    setProducts(item: Array<IProductCard>) {
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
