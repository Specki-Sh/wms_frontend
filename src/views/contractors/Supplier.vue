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
import { Supplier as ISupplier } from "@/api/models";
import { headers } from "@/api/models";
// component
import TableAction from "@/components/BaseTableAction.vue";
// api
import api from "@/api/index";

export default defineComponent({
  components: { TableAction },
  name: "Supplier",
  data() {
    return {
      headers: headers.supplier,
      desserts: [] as Array<ISupplier>,
      totalPages: null as number | null,
      page: 1,
      per_page: 10,
    };
  },
  methods: {
    setDesserts(desserts: Array<ISupplier>) {
      this.desserts = desserts;
    },
    setTotalPages(total: number) {
      this.totalPages = (total - total % this.per_page) / this.per_page;
      if (total % this.per_page != 0){ this.totalPages += 1}
    },
    async updateData(page = 1) {
      const data = await api.supplier.getByPage(page, this.per_page);
      this.setDesserts(data.suppliers);
      this.setTotalPages(data.total);
    },
    addItem(item: ISupplier) {
      api.supplier.add(item).then(
        () => {
          this.updateData(this.page);
        },
        (error: unknown) =>
          console.warn("Function addItem in Supplier.vue", error)
      );
    },
    editItem(data: { id: number; item: ISupplier }) {
      api.supplier.change(data.id, data.item).then(
        () => {
          this.updateData(this.page);
        },
        (error: unknown) =>
          console.warn("Function EditItem in Supplier.vue", error)
      );
    },
    removeItem(id: number) {
      api.supplier.remove(id).then(
        () => {
          this.updateData(this.page);
        },
        (error: unknown) =>
          console.warn("Function removeItem in Supplier.vue", error)
      );
    },
  },
  watch: {
    page(newValue) {``
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
