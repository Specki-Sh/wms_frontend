<template>
  <base-table>
    <template #title-content>
      <div class="title-content">
        <base-button @click="changeAddModalStatus()">add</base-button>
      </div>
    </template>

    <template #column-header>
      <th class="th"></th>
    </template>
    <template v-slot:column-dessert="td">
      <table-action-column-dessert
        @remove="callRemoveEvent(td.id)"
        @edit="callEditEvent(td.id, td.index)"
      ></table-action-column-dessert>
    </template>

    <template #footer>
      <modal-window-add-form
        :headers="getHeaders"
        v-if="isAdd"
        @close="changeAddModalStatus()"
        @agree="addItem($event)"
      />
      <modal-window-edit-form
        :headers="getHeaders"
        :dessert="editDessert"
        v-if="isEdit"
        @close="changeEditModalStatus()"
        @agree="editItem(editId, $event)"
      />
      <modal-window-delete-form
        v-if="isRemove"
        @close="closeRemoveEvent()"
        @agree="removeItem(removeId)"
      />
    </template>
  </base-table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// component
import BaseTable from "./BaseTable.vue";
import ModalWindowAddForm from "@/components/modalWindow/ModalWindowAddForm.vue";
import ModalWindowEditForm from "@/components/modalWindow/ModalWindowEditForm.vue";
import ModalWindowDeleteForm from "@/components/modalWindow/ModalWindowDeleteForm.vue";

import TableActionColumnDessert from "./TableActionColumnDessert.vue";
import BaseButton from "@/components/BaseButton.vue";
//api
import api from "@/api/index";

export default defineComponent({
  components: {
    BaseTable,
    ModalWindowAddForm,
    ModalWindowEditForm,
    ModalWindowDeleteForm,
    TableActionColumnDessert,
    BaseButton,
  },
  emits: ["updateDessert"],
  data() {
    return {
      isAdd: false,

      isEdit: false,
      editDessert: new Object(),
      editId: null as number | null,

      isRemove: false,
      removeId: null as number | null,
      name: this.$attrs.name as string,
    };
  },
  computed: {
    getHeaders() {
      return this.$attrs.headers;
    },
    getDesserts(): any {
      return this.$attrs.desserts;
    },
  },
  methods: {
    //add helper
    changeAddModalStatus() {
      this.isAdd = !this.isAdd;
    },
    apiAdd(dbItem: unknown) {
      api[this.name].add(dbItem);
    },
    addItem(dbItem: unknown) {
      this.apiAdd(dbItem);
      this.changeAddModalStatus();
      this.$emit("updateDessert");
    },
    //edit helper
    changeEditModalStatus() {
      this.isEdit = !this.isEdit;
    },
    setEditDessert(index: number) {
      this.editDessert = Object.assign({}, this.getDesserts[index]);
    },
    setEditId(id: number) {
      this.editId = id;
    },
    clearEditDessert() {
      this.editDessert = new Object();
    },
    clearEditId() {
      this.editId = null;
    },
    callEditEvent(id: number, index: number) {
      this.changeEditModalStatus();
      this.setEditDessert(index);
      this.setEditId(id);
    },
    closeEditEvent() {
      this.changeEditModalStatus();
      this.clearEditDessert();
      this.clearEditId();
    },
    editItem(id: number, dbItem: unknown) {
      this.apiEdit(id, dbItem);
      this.closeEditEvent();
      this.$emit("updateDessert");
    },
    apiEdit(id: number, dbItem: unknown) {
      api[this.name].change(id, dbItem);
    },
    //remove helper
    changeRemoveModalStatus() {
      this.isRemove = !this.isRemove;
    },
    setRemoveId(id: number) {
      this.removeId = id;
    },
    clearRemoveId() {
      this.removeId = null;
    },
    callRemoveEvent(id: number) {
      this.changeRemoveModalStatus();
      this.setRemoveId(id);
    },
    closeRemoveEvent() {
      this.changeRemoveModalStatus();
      this.clearRemoveId();
    },
    removeItem(id: number) {
      this.apiRemove(id);
      this.closeRemoveEvent();
      this.$emit("updateDessert");
    },
    apiRemove(id: number) {
      api[this.name].remove(id);
    },
  },
});
</script>

<style scoped>
:root {
  --gray-tone-100: #242533;
  --gray-tone-80: #484964;
  --gray-tone-60: #808192;
  --gray-tone-40: #abacbe;
  --gray-tone-20: #bcbcc6;
  --gray-tone-8: #eeeef2;
  --gray-tone-4: #f3f3f8;
  --light-tone: #f9f9fc;
  --white-full: #ffffff;
  --accent-tone-100: #644ded;
  --accent-tone-50: #ad9fff;
  --accent-opac-8: #dbd9e6;
  --secondary-blue-100: #e9e8fc;
  --secondary-yellow-100: #faf3e1;
}
.title-content {
  display: flex;
  float: right;
  margin: 7px;
}
.th {
  width: 2%;
  border-bottom: 2px var(--gray-tone-8) solid;
}
</style>
