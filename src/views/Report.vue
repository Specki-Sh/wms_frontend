<template>
  <div class="content">
    <div class="date">
      <va-date-input mode="range" v-model="range" outline />
    </div>
    <div class="table">
      <va-data-table :columns="headers" :items="desserts" />
    </div>
  </div>
</template>

<script lang="ts">
// vue
import { defineComponent } from "vue";
// Models
import { Report as IReport } from "@/api/models";
import { headers } from "@/api/models";
// api
import api from "@/api/index";

export default defineComponent({
  name: "Report",
  data() {
    return {
      headers: headers.report,
      desserts: [] as Array<IReport>,
      range: { start: null, end: null } as {
        start: Date | null;
        end: Date | null;
      },
    };
  },
  methods: {
    setDesserts(desserts: any) {
      desserts.forEach((elm: any) => {
        elm["product_name"] = elm.product_info.name;
        elm["product_code"] = elm.product_info.code;
        elm["product_unit"] = elm.product_info.unit;
        elm["opening_balance_quantity"] = elm.beginning_balance.quantity;
        elm["opening_balance_total_cost"] = elm.beginning_balance.total_cost;
        if (null !== elm.acceptance){
        elm["acceptance_quantity"] = elm.acceptance.quantity;
        elm["acceptance_total_cost"] = elm.acceptance.cost;}
        else {
          elm["acceptance_quantity"] = 0;
          elm["acceptance_total_cost"] = 0;
        }
        if (null !== elm.expense){
        elm["expense_quantity"] = elm.expense.quantity;
        elm["expense_total_cost"] = elm.expense.cost;}
        else{
          elm["expense_quantity"] = 0;
          elm["expense_total_cost"] = 0;}
        elm["closing_balance_quantity"] = elm.closing_balance.quantity;
        elm["closing_balance_total_cost"] = elm.closing_balance.total_cost;
      });
      this.desserts = desserts;
    },
    async updateData(range: { start: Date; end: Date }) {
      const data = await api.report.get_by_date({
        _from: range.start.toISOString().split('T')[0],
        till: range.end.toISOString().split('T')[0],
      });
      this.setDesserts(data.data);
    },
  },
  watch: {
    range(newValue) {
      if (newValue.start !== null && newValue.end !== null) {
        this.updateData(newValue);
      }
    },
  },
});
</script>

<style>
.content {
  margin-top: 3rem;
  width: 100%;
}
.date {
  display: flex;
}
.pagination {
  margin: auto;
}
</style>
