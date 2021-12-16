<template>
  <div class="table">
    <base-table :desserts="desserts" :headers="headers" name="warehouse" />
  </div>
</template>

<script lang="ts">
// vue
import { defineComponent } from "vue";
// Type
import { Warehouse as IWarehouse } from "@/api/models";
// component
import BaseTable from "@/components/table/BaseTable.vue";
// api
import api from "@/api/index";
import { addNameById } from "@/utils";

export default defineComponent({
  name: "Warehouse",
  components: { BaseTable },
  data() {
    return {
      headers: ["id", "product", "quantity"],
      desserts: [] as Array<IWarehouse>,
    };
  },
  methods: {
    setDesserts(desserts: Array<IWarehouse>) {
      this.desserts = desserts;
    },
    async updateDessert() {
      const desserts = await api.warehouse.getAll();
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
}
</style>
