<template>
  <div class="table">
    <table-action
      :desserts="desserts"
      :headers="headers"
      name="product"
      @add="addEvent()"
      @edit="editEvent($event)"
      @remove="removeEvent($event)"
    />
    <va-pagination
      class="pagination"
      v-model="page"
      :pages="totalPages"
      input
    />
  </div>
  <div class="modalWindows">
    <va-modal
      v-model="showAddModal"
      @cancel="clearDBModel()"
      @ok="addItem()"
      title="Add"
    >
      <db-form :labels="headers" v-model="DBModel" />
    </va-modal>
    <va-modal
      v-model="showEditModal"
      @cancel="clearDBModel(), clearEventItem()"
      @ok="editItem"
      title="Edit"
    >
      <db-form :labels="headers" v-model="DBModel" />
    </va-modal>
    <va-modal
      v-model="showRemoveModal"
      @cancel="clearEventItem()"
      @ok="removeItem()"
      title="Remove"
    >
      This action remove the selected item from the table. Are you sure?
    </va-modal>
  </div>
</template>

<script lang="ts">
// vue
import { defineComponent } from "vue";
// Models
import { Product as IProduct } from "@/api/models";
import { headers } from "@/api/models";
// component
import TableAction from "@/components/TableAction.vue";
import dbForm from "@/components/dbForm.vue";
// api
import api from "@/api/index";
export default defineComponent({
  components: { TableAction, dbForm },
  name: "Product",
  data() {
    return {
      showAddModal: false,
      showEditModal: false,
      showRemoveModal: false,
      eventItem: null as IProduct | null,
      DBModel: {} as IProduct,

      headers: headers.product,
      desserts: [] as Array<IProduct>,
      totalPages: null as number | null,
      page: 1,
    };
  },
  methods: {
    // TODO: Вынести все это в отдельный компонент c инветами для взаимодейсвтия api,
    // должно получить 3 ивента(add, edit, remove).
    // TODO: Реализовать общий интерфейс для action(add, edit, remove) когда будет рефакторинг на composition api
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

    setEventItem(item: IProduct) {
      this.eventItem = item;
    },
    clearEventItem() {
      this.eventItem = null;
    },
    setDBModel(item: IProduct) {
      this.DBModel = item;
    },
    clearDBModel() {
      this.DBModel = {} as IProduct;
    },
    // add Event
    addEvent() {
      this.changeAddModalStatus();
    },
    changeAddModalStatus() {
      this.showAddModal = !this.showAddModal;
    },
    addItem() {
      api.product.add(this.DBModel).then(
        () => {
          this.clearDBModel();
          this.updateDessert(this.page);
        },
        (error: unknown) =>
          console.warn(
            "Function removeItem error in Product.vue component",
            error
          )
      );
    },
    // edit Event
    editEvent(item: IProduct) {
      this.changeEditModalStatus();
      this.setEventItem(item);
      this.setDBModel(item);
    },
    changeEditModalStatus() {
      this.showEditModal = !this.showEditModal;
    },
    editItem() {
      const id = this.eventItem?.id;
      api.product.change(id, this.DBModel).then(
        () => {
          this.clearDBModel();
          this.updateDessert(this.page);
        },
        (error: unknown) =>
          console.warn(
            "Function removeItem error in Product.vue component",
            error
          )
      );
    },
    // remove Event
    removeEvent(item: IProduct) {
      this.changeRemoveModalStatus();
      this.setEventItem(item);
    },
    changeRemoveModalStatus() {
      this.showRemoveModal = !this.showRemoveModal;
    },
    removeItem() {
      const id = this.eventItem?.id;
      api.product.remove(id).then(
        () => {
          this.clearEventItem();
          this.updateDessert(this.page);
        },
        (error: unknown) =>
          console.warn(
            "Function removeItem error in Product.vue component",
            error
          )
      );
    },
  },
  watch: {
    page(newValue) {
      this.changePage(newValue);
    },
  },
  mounted() {
    this.updateDessert();
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
