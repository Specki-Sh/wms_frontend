<template>
  <div class="table">
    <table-action
      :headers="headers"
      :desserts="desserts"
      @add="addItem($event)"
      @edit="editItem($event)"
      @remove="removeItem($event)"
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
import { defineComponent } from "vue";
// Models
import { Expense as IExpense } from "@/api/models";
import { headers } from "@/api/models";
// component
import TableAction from "@/components/BaseTableAction.vue";
// api
import api from "@/api/index";

export default defineComponent({
  components: { TableAction },
  name: "Expense",
  data() {
    return {
      headers: headers.expense,
      desserts: [] as Array<IExpense>,
      totalPages: null as number | null,
      page: 1,
    };
  },
  methods: {
    setDesserts(desserts: Array<IExpense>) {
      this.desserts = desserts;
    },
    setTotalPages(pages: number) {
      this.totalPages = pages;
    },
    async updateData(page = 1) {
      const data = await api.expense.getByPage(page);
      this.setDesserts(data.items);
      this.setTotalPages(data._meta.total_pages);
    },
    addItem(item: IExpense) {
      api.expense.add(item).then(
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
    removeItem(id: number) {
      api.expense.remove(id).then(
        () => {
          this.updateData(this.page);
        },
        (error: unknown) =>
          console.warn("Function removeItem in Expense.vue", error)
      );
    },
  },
  watch: {
    page(newValue) {
      this.updateData(newValue);
    },
  },
  mounted() {
    this.updateData();
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
