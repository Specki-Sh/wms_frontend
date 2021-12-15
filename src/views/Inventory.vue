<template>
  <div class="table">
    <table-action
      :desserts="desserts"
      :headers="headers"
      name="product"
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
import { Product as IProduct } from "@/api/models";
import { headers } from "@/api/models";
// component
import TableAction from "@/components/table/TableAction.vue";
import BasePagination from "@/components/BasePagination.vue";
// api
import api from "@/api/index";

export default defineComponent({
  components: { TableAction, BasePagination },
  name: "Inventory",
  data() {
    return {
      headers: headers.product,
      desserts: [] as Array<IProduct>,
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
    setDesserts(desserts: Array<IProduct>) {
      this.desserts = desserts;
    },
    setTotalPages(pages: number) {
      this.totalPages = pages;
    },
    async updateDessert(page = 1) {
      const data = await api.product.getByPage(page);
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
