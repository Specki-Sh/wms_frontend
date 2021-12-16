<template>
  <div class="table">
    <table-action
      :desserts="desserts"
      :headers="headers"
      name="supplier"
      @updateDessert="updateDessert"
    />
    <base-pagination
      :length="totalPages"
      @clickPagination="changePage($event)"
      class="pagination"
    ></base-pagination>
  </div>
</template>

<script lang="ts">
// vue
import { defineComponent } from "vue";
// Models
import { Supplier as ISupplier } from "@/api/models";
import { headers } from "@/api/models";
// component
import TableAction from "@/components/table/TableAction.vue";
import BasePagination from "@/components/BasePagination.vue";
// api
import api from "@/api/index";

export default defineComponent({
  components: { TableAction, BasePagination },
  name: "Supplier",
  data() {
    return {
      headers: headers.supplier,
      desserts: [] as Array<ISupplier>,
      totalPages: null as number | null,
      page: null as number | null,
    };
  },
  methods: {
    setPage(page: number) {
      this.page = page;
    },
    changePage(page: number) {
      this.setPage(page);
      this.updateDessert(page);
    },
    setDesserts(desserts: Array<ISupplier>) {
      this.desserts = desserts;
    },
    setTotalPages(pages: number) {
      this.totalPages = pages;
    },
    async updateDessert(page = 1) {
      const data = await api.supplier.getByPage(page);
      this.setDesserts(data.items);
      this.setTotalPages(data._meta.total_pages);
    },
  },
  mounted() {
    this.updateDessert();
  },
});
</script>

<style>
.table {
  width: 100%;
  margin-top: 3rem;
}
.pagination {
  margin: 3% auto;
}
</style>
