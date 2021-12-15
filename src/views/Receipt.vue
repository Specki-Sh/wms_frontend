<template>
  <div class="table">
    <table-action
      :desserts="desserts"
      :headers="headers"
      name="receipt"
      @updateDessert="updateDessert"
    />
  </div>
</template>

<script lang="ts">
// vue
import { defineComponent } from "vue";
// Type
import { Receipt as IReceipt } from "@/api/models";
// component
import TableAction from "@/components/table/TableAction.vue";
// api
import api from "@/api/index";
import { addNameById } from "@/utils";

export default defineComponent({
  components: { TableAction },
  name: "Inventory",
  data() {
    return {
      headers: ["id", "supplier", "product", "quantity", "price", "date"],
      desserts: [] as Array<IReceipt>,
    };
  },
  methods: {
    setDesserts(desserts: Array<IReceipt>) {
      this.desserts = desserts;
    },
    async updateDessert() {
      const desserts = await api.receipt.getAll();
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
