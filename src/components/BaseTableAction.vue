<template>
  <div>
    <va-data-table
      :items="desserts"
      :columns="[...headers, 'action']"
      :striped="true"
      :hoverable="true"
      clickable
      @row:click="setCurrentItem($event.item)"
    >
      <template #headerPrepend>
        <div class="title-content">
          <va-button @click="addEvent()">add</va-button>
        </div>
      </template>

      <template #cell(action)>
        <va-button-dropdown size="small" flat class="ml-2">
          <va-button-group flat>
            <va-button @click="editEvent(currentItem)" icon="edit">
              Edit
            </va-button>
            <va-button
              @click="removeEvent(currentItem)"
              icon-right="delete_outline"
            >
              Remove
            </va-button>
          </va-button-group>
        </va-button-dropdown>
      </template>
    </va-data-table>
  </div>
  <div class="modalWindows">
    <va-modal
      v-model="showAddModal"
      @cancel="clearDBModel()"
      @ok="addItem()"
      title="Add"
    >
      <the-data-base-form :labels="headers" v-model="DBModel" />
    </va-modal>
    <va-modal
      v-model="showEditModal"
      @cancel="clearDBModel()"
      @ok="editItem"
      title="Edit"
    >
      <the-data-base-form :labels="headers" v-model="DBModel" />
    </va-modal>
    <va-modal v-model="showRemoveModal" @ok="removeItem()" title="Remove">
      This action remove the selected item from the table. Are you sure?
    </va-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Product, Supplier, Customer, Receipt, Expense } from "@/api/models";
import TheDataBaseForm from "./TheDataBaseForm.vue";
// TODO: IDBTable переменовать в IDBTables, добавить в отдельный файл с последующим импортом в данный компонент
type IDBTable = Product | Supplier | Customer | Receipt | Expense;

export default defineComponent({
  components: { TheDataBaseForm },
  name: "ActionTable",
  emits: ["add", "edit", "remove"],
  props: {
    headers: { type: Array as PropType<Array<string>>, required: true },
    desserts: { type: Array as PropType<Array<IDBTable>>, required: true },
  },
  data() {
    return {
      showAddModal: false,
      showEditModal: false,
      showRemoveModal: false,
      DBModel: {} as IDBTable,
      currentItem: {} as IDBTable,
    };
  },
  methods: {
    setCurrentItem(item: IDBTable): void {
      this.currentItem = item;
    },

    setDBModel(item: IDBTable) {
      this.DBModel = item;
    },
    clearDBModel() {
      this.DBModel = {} as IDBTable;
    },
    // TODO: Реализовать общий интерфейс для action(add, edit, remove) когда будет рефакторинг на composition api
    // add Event
    addEvent() {
      this.changeAddModalStatus();
    },
    changeAddModalStatus() {
      this.showAddModal = !this.showAddModal;
    },
    addItem() {
      this.$emit("add", this.DBModel);
    },
    // edit Event
    editEvent() {
      this.changeEditModalStatus();
      this.setDBModel(this.currentItem);
    },
    changeEditModalStatus() {
      this.showEditModal = !this.showEditModal;
    },
    editItem() {
      const id = this.currentItem?.id;
      this.$emit("edit", { id, item: this.DBModel });
    },
    // remove Event
    removeEvent() {
      this.changeRemoveModalStatus();
    },
    changeRemoveModalStatus() {
      this.showRemoveModal = !this.showRemoveModal;
    },
    removeItem() {
      const id = this.currentItem?.id;
      this.$emit("remove", id);
    },
  },
});
</script>
