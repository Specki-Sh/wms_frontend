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
import { DispatchedProduct as IDispatchedProduct } from "@/api/models";
import { headers } from "@/api/models";
// component
import TableAction from "@/components/BaseTableAction.vue";
// api
import api from "@/api/index";

export default defineComponent({
  components: { TableAction },
  name: "DispatchedProduct",
  data() {
    return {
      headers: headers.dispatched_product,
      desserts: [] as Array<IDispatchedProduct>,
      totalPages: null as number | null,
      page: 1,
    };
  },
  methods: {
    setDesserts(desserts: Array<IDispatchedProduct>) {
      this.desserts = desserts;
    },
    setTotalPages(pages: number) {
      this.totalPages = pages;
    },
    async updateData(page = 1) {
      const data = await api.dispatched_product.getByPage(page);
      this.setDesserts(data.items);
      this.setTotalPages(data._meta.total_pages);
    },
    addItem(item: IDispatchedProduct) {
      api.dispatched_product.add(item).then(
        () => {
          this.updateData(this.page);
        },
        (error: unknown) =>
          console.warn("Function addItem in DispatchedProduct.vue", error)
      );
    },
    editItem(data: { id: number; item: IDispatchedProduct }) {
      api.dispatched_product.change(data.id, data.item).then(
        () => {
          this.updateData(this.page);
        },
        (error: unknown) =>
          console.warn("Function EditItem in DispatchedProduct.vue", error)
      );
    },
    removeItem(id: number) {
      api.dispatched_product.remove(id).then(
        () => {
          this.updateData(this.page);
        },
        (error: unknown) =>
          console.warn("Function removeItem in DispatchedProduct.vue", error)
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
