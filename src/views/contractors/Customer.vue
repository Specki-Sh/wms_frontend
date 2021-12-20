<template>
  <div class="table">
    <table-action
      :desserts="desserts"
      :headers="headers"
      name="customer"
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
import { Customer as ICustomer } from "@/api/models";
import { headers } from "@/api/models";
// component
import TableAction from "@/components/TableAction.vue";
import dbForm from "@/components/dbForm.vue";
// api
import api from "@/api/index";
export default defineComponent({
  components: { TableAction, dbForm },
  name: "Customer",
  data() {
    return {
      showAddModal: false,
      showEditModal: false,
      showRemoveModal: false,
      eventItem: null as ICustomer | null,
      DBModel: {} as ICustomer,

      headers: headers.customer,
      desserts: [] as Array<ICustomer>,
      totalPages: null as number | null,
      page: 1,
    };
  },
  methods: {
    // TODO: Реализовать общий интерфейс для action(add, edit, remove) когда будет рефакторинг на composition api
    setPage(page: number) {
      this.page = page;
    },
    changePage(page: number) {
      this.setPage(page);
      this.updateDessert(page);
    },
    setDesserts(desserts: Array<ICustomer>) {
      this.desserts = desserts;
    },
    setTotalPages(pages: number) {
      this.totalPages = pages;
    },
    async updateDessert(page = 1) {
      const data = await api.customer.getByPage(page);
      this.setDesserts(data.items);
      this.setTotalPages(data._meta.total_pages);
    },

    setEventItem(item: ICustomer) {
      this.eventItem = item;
    },
    clearEventItem() {
      this.eventItem = null;
    },
    setDBModel(item: ICustomer) {
      this.DBModel = item;
    },
    clearDBModel() {
      this.DBModel = {} as ICustomer;
    },
    // add Event
    addEvent() {
      this.changeAddModalStatus();
    },
    changeAddModalStatus() {
      this.showAddModal = !this.showAddModal;
    },
    addItem() {
      api.customer.add(this.DBModel).then(
        () => {
          this.clearDBModel();
          this.updateDessert(this.page);
        },
        (error: unknown) =>
          console.warn(
            "Function removeItem error in Customer.vue component",
            error
          )
      );
    },
    // edit Event
    editEvent(item: ICustomer) {
      this.changeEditModalStatus();
      this.setEventItem(item);
      this.setDBModel(item);
    },
    changeEditModalStatus() {
      this.showEditModal = !this.showEditModal;
    },
    editItem() {
      const id = this.eventItem?.id;
      api.customer.change(id, this.DBModel).then(
        () => {
          this.clearDBModel();
          this.updateDessert(this.page);
        },
        (error: unknown) =>
          console.warn(
            "Function removeItem error in Customer.vue component",
            error
          )
      );
    },
    // remove Event
    removeEvent(item: ICustomer) {
      this.changeRemoveModalStatus();
      this.setEventItem(item);
    },
    changeRemoveModalStatus() {
      this.showRemoveModal = !this.showRemoveModal;
    },
    removeItem() {
      const id = this.eventItem?.id;
      api.customer.remove(id).then(
        () => {
          this.clearEventItem();
          this.updateDessert(this.page);
        },
        (error: unknown) =>
          console.warn(
            "Function removeItem error in Customer.vue component",
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
