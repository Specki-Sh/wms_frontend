<template>
  <div class="table">
    <table-action
      :headers="headers"
      :desserts="desserts"
      @add="addItem($event)"
      @edit="editItem($event)"
      @remove="removeItem($event)"
    />
    <div class="table-example--pagination">
      <va-pagination
        class="pagination"
        v-model="page"
        :pages="totalPages"
        input
      />
    </div>
    <div>
      <va-input
        class="flex mb-2 md3"
        type="number"
        placeholder="Items..."
        label="Items per page"
        v-model="per_page"
      />
    </div>
  </div>
</template>

<script lang="ts">
// vue
import { defineComponent } from "vue";
// Models
import { Customer as ICustomer } from "@/api/models";
import { headers } from "@/api/models";
// component
import TableAction from "@/components/BaseTableAction.vue";
// api
import api from "@/api/index";

export default defineComponent({
  components: { TableAction },
  name: "Customer",
  data() {
    return {
      headers: headers.customer,
      desserts: [] as Array<ICustomer>,
      totalPages: null as number | null,
      page: 1,
      per_page: 10,
    };
  },
  methods: {
    setDesserts(desserts: Array<ICustomer>) {
      this.desserts = desserts;
    },
    setTotalPages(total: number) {
      this.totalPages = (total - total % this.per_page) / this.per_page;
      if (total % this.per_page != 0){ this.totalPages += 1}
    },
    async updateData() {
      const data = await api.customer.getByPage(this.page, this.per_page);
      this.setDesserts(data.customers);
      this.setTotalPages(data.total);
    },
    addItem(item: ICustomer) {
      api.customer.add(item).then(
        () => {
          this.updateData();
        },
        (error: unknown) =>
          console.warn("Function addItem in Customer.vue", error)
      );
    },
    editItem(data: { id: number; item: ICustomer }) {
      api.customer.change(data.id, data.item).then(
        () => {
          this.updateData();
        },
        (error: unknown) =>
          console.warn("Function EditItem in Customer.vue", error)
      );
    },
    removeItem(id: number) {
      api.customer.remove(id).then(
        () => {
          this.updateData();
        },
        (error: unknown) =>
          console.warn("Function removeItem in Customer.vue", error)
      );
    },
  },
  watch: {
    page() {``
      this.updateData();
    },
    per_page() {``
      this.updateData();
    },
  },
  mounted() {
    this.updateData();
  },
});
</script>

<style lang="scss" scoped>
.table {
  margin-top: 3rem;
  width: 100%;
}
.pagination {
  margin: auto;
}
.table-example--pagination {
  display: flex;
  justify-content: center;
}
</style>
