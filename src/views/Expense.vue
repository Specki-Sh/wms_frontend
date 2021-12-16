<template>
  <div class="table">
    <table-action
      :desserts="desserts"
      :headers="headers"
      name="expense"
      @updateDessert="updateDessert"
    />
  </div>
</template>

<script lang="ts">
// vue
import { defineComponent } from "vue";
// Type
import { Expense as IExpense } from "@/api/models";
// component
import TableAction from "@/components/table/TableAction.vue";
// api
import api from "@/api/index";
import { addNameById } from "@/utils";

export default defineComponent({
  components: { TableAction },
  name: "Expense",
  data() {
    return {
      headers: ["id", "customer", "product", "quantity", "price", "date"],
      desserts: [] as Array<IExpense>,
    };
  },
  methods: {
    setDesserts(desserts: Array<IExpense>) {
      this.desserts = desserts;
    },
    async updateDessert() {
      const desserts = await api.expense.getAll();
      this.setDesserts(desserts.items);
      addNameById(this.desserts);
    },
  },
  mounted() {
    this.updateDessert();
    setInterval(async () => {
      this.updateDessert;
    }, 10000);
  },
  beforeUnmount() {
    let killId = setTimeout(function () {
      for (var i = killId; i > 0; i--) clearInterval(i);
    }, 3000);
  },
});
</script>

<style>
.table {
  width: 100%;
  margin-top: 3rem;
  margin-top: 3rem;
}
</style>
