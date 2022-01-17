<template>
  <div>
    <va-data-table
      :items="desserts"
      :columns="[...headers, 'action']"
      :striped="true"
      :hoverable="true"
    >
      <template #headerPrepend>
        <div class="title-content">
          <va-button @click="addEvent()">
            {{ translationsActionRus["add"] }}
          </va-button>
        </div>
      </template>

      <template #cell(action)="row">
        <va-button-dropdown size="small" flat class="ml-2">
          <va-button-group flat>
            <va-button
              v-if="isEditAction"
              @click="editEvent(row.rowIndex)"
              icon="edit"
            >
              {{ translationsActionRus["edit"] }}
            </va-button>
            <va-button
              @click="removeEvent(row.rowIndex)"
              icon-right="delete_outline"
            >
              {{ translationsActionRus["remove"] }}
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
      :title="translationsActionRus['add']"
    >
      <the-data-base-form :labels="headers" v-model="DBModel" />
    </va-modal>
    <va-modal
      v-model="showEditModal"
      @cancel="clearDBModel()"
      @ok="editItem()"
      :title="translationsActionRus['edit']"
    >
      <the-data-base-form :labels="headers" v-model="DBModel" />
    </va-modal>
    <va-modal
      v-model="showRemoveModal"
      @cancel="clearDBModel()"
      @ok="removeItem()"
      :title="translationsActionRus['remove']"
    >
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
    isEditAction: { type: Boolean, default: true },
  },
  data() {
    return {
      showAddModal: false,
      showEditModal: false,
      showRemoveModal: false,
      DBModel: {} as IDBTable,
      translationsActionRus: require("../lang/rus/action.json"),
    };
  },
  methods: {
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
      this.clearDBModel();
    },
    // edit Event
    editEvent(id: number) {
      this.changeEditModalStatus();
      this.setDBModel(this.desserts[id]);
    },
    changeEditModalStatus() {
      this.showEditModal = !this.showEditModal;
    },
    editItem() {
      const id: number = this.DBModel.id;
      this.$emit("edit", { id, item: this.DBModel });
      this.clearDBModel();
    },
    // remove Event
    removeEvent(id: number) {
      this.changeRemoveModalStatus();
      this.setDBModel(this.desserts[id]);
    },
    changeRemoveModalStatus() {
      this.showRemoveModal = !this.showRemoveModal;
    },
    removeItem() {
      const id: number = this.DBModel.id;
      this.$emit("remove", id);
      this.clearDBModel();
    },
  },
});
</script>
