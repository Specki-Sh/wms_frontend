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
import { Product as IProduct } from "@/api/models";
import { headers } from "@/api/models";
// component
import TableAction from "@/components/BaseTableAction.vue";
// api
import api from "@/api/index";

export default defineComponent({
  components: { TableAction },
  name: "Product",
  data() {
    return {
      headers: headers.product,
      desserts: [] as Array<IProduct>,
      totalPages: null as number | null,
      page: 1,
      per_page: 10,
    };
  },
  methods: {
    setDesserts(desserts: Array<IProduct>) {
      this.desserts = desserts;
    },
    setTotalPages(total: number) {
      this.totalPages = (total - total % this.per_page) / this.per_page;
      if (total % this.per_page != 0){ this.totalPages += 1}
    },
    async updateData(page = 1) {
      const data = await api.product.getByPage(page, this.per_page);
      this.setDesserts(data.products);
      this.setTotalPages(data.total);
    },
    addItem(item: IProduct) {
      api.product.add(item).then(
        () => {
          this.updateData(this.page);
        },
        (error: unknown) =>
          console.warn("Function addItem in Product.vue", error)
      );
    },
    editItem(data: { id: number; item: IProduct }) {
      api.product.change(data.id, data.item).then(
        () => {
          this.updateData(this.page);
        },
        (error: unknown) =>
          console.warn("Function EditItem in Product.vue", error)
      );
    },
    removeItem(id: number) {
      api.product.remove(id).then(
        () => {
          this.updateData(this.page);
        },
        (error: unknown) =>
          console.warn("Function removeItem in Product.vue", error)
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
