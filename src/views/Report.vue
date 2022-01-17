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
    setDesserts(desserts: Array<IReport>) {
      desserts.forEach((elm) => {
        elm["product_name"] = elm.product.name;
        elm["product_unit"] = elm.product.unit;
        elm["product_price"] = elm.product.price;
      });
      this.desserts = desserts;
    },
    async updateData(range: { start: Date; end: Date }) {
      const data = await api.report.get_by_date(range);
      this.setDesserts(data);
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
