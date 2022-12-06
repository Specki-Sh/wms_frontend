<template>
  <div class="table">
    <goods-table-action
      :headers="headers"
      :desserts="desserts"
      @add="addItem($event)"
      @edit="editItem($event)"
      @remove="removeItem($event)"
      @update:Contractors="updateContractors($event)"
      @update:Products="updateProducts($event)"
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
import { defineComponent, computed } from "vue";
// Models
import { Acceptance as IAcceptance } from "@/api/models";
import { Supplier as ISupplier, Product as IProduct } from "@/api/models";
import { headers } from "@/api/models";
// component
import GoodsTableAction from "@/components/Goods/GoodsTableAction.vue";
// api
import api from "@/api/index";

interface ITable<T> {
  items: Array<T>;
  headers: Array<string>;
  totalPages: number;
}

export default defineComponent({
  components: { GoodsTableAction },
  name: "Acceptance",
  data() {
    return {
      headers: headers.acceptance,
      desserts: [] as Array<IAcceptance>,
      totalPages: 0,
      page: 1,
      contractors: {
        items: [] as Array<ISupplier>,
        totalPages: 0,
        headers: headers.supplier,
      } as ITable<ISupplier>,
      products: {
        items: [] as Array<IProduct>,
        totalPages: 0,
        headers: headers.product,
      } as ITable<IProduct>,
    };
  },
  provide() {
    return {
      contractors: computed(() => this.contractors),
      products: computed(() => this.products),
    };
  },
  methods: {
    setDesserts(desserts: Array<IAcceptance>) {
      desserts.forEach((dessert) => {
        dessert["date"] = new Date(dessert["date"])
          .toLocaleString()
          .slice(0, 10);
      });
      this.desserts = desserts;
    },
    setTotalPages(total: number) {
      this.totalPages = (total - total % 10) / 10;
      if (total % 10 != 0) {total +=1}
    },
    async updateData(page = 1) {
      const data = await api.acceptance.getByPage(page);
      this.setDesserts(data.items);
      this.setTotalPages(data.total);
    },
    addItem(item: IAcceptance) {
      api.acceptance.add(item).then(
        () => {
          this.updateData(this.page);
        },
        (error: unknown) =>
          console.warn("Function addItem in Acceptance.vue", error)
      );
    },
    editItem(data: { id: number; item: IAcceptance }) {
      api.acceptance.change(data.id, data.item).then(
        () => {
          this.updateData(this.page);
        },
        (error: unknown) =>
          console.warn("Function EditItem in Acceptance.vue", error)
      );
    },
    removeItem(id: number) {
      api.acceptance.remove(id).then(
        () => {
          this.updateData(this.page);
        },
        (error: unknown) =>
          console.warn("Function removeItem in Acceptance.vue", error)
      );
    },
    setContractorsItems(item: Array<ISupplier>) {
      this.contractors.items = item;
    },
    setContractorsTotalPages(total: number) {
      this.contractors.totalPages = (total - total % 10) / 10;
        if (total % 10 != 0) {this.contractors.totalPages +=1}
    },
    async updateContractors(page = 1) {
      const data = await api.supplier.getByPage(page);
      this.setContractorsItems(data.suppliers);
      this.setContractorsTotalPages(data.total);
    },
    setProducts(item: Array<IProduct>) {
      this.products.items = item;
    },
    setProductTotalPages(total: number) {
      this.products.totalPages = (total - total % 10) / 10
      if (total % 10 != 0) { this.products.totalPages += 1}
    },
    async updateProducts(page = 1) {
      const data = await api.product.getByPage(page);
      this.setProducts(data.products);
      this.setProductTotalPages(data.total);
    },
  },
  watch: {
    page(newValue) {
      this.updateData(newValue);
    },
  },
  mounted() {
    this.updateData();
    this.updateProducts();
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
