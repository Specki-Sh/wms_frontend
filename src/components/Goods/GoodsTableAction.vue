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
          <va-button @click="addEvent()">add</va-button>
        </div>
      </template>

      <template #cell(action)="row">
            <va-button
              @click="removeEvent(row.rowIndex)"
              icon="delete_outline"
              flat
            >
            </va-button>
      </template>
    </va-data-table>
  </div>
  <div class="modalWindows">
    <va-modal
      v-model="showAddModal"
      @cancel="clearDBModel()"
      @ok="addItem()"
      title="Add"
      fullscreen
    >
      <goods-form
        :labels="headers"
        v-model="DBModel"
        @update:Contractors="$emit('update:Contractors', $event)"
        @update:Products="$emit('update:Products', $event)"
      />
    </va-modal>
    <va-modal
      v-model="showEditModal"
      @cancel="clearDBModel()"
      @ok="editItem()"
      title="Edit"
    >
      <goods-form
        :labels="headers"
        v-model="DBModel"
        @update:Contractors="$emit('update:Contractors', $event)"
        @update:Products="$emit('update:Products', $event)"
      />
    </va-modal>
    <va-modal
      v-model="showRemoveModal"
      @cancel="clearDBModel()"
      @ok="removeItem()"
      title="Remove"
    >
      This action remove the selected item from the table. Are you sure?
    </va-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ProductCard, Supplier, Customer, DeliveredProduct, DispatchedProduct } from "@/api/models";
import GoodsForm from "./GoodsForm.vue";
type IDBTable = ProductCard | Supplier | Customer | DeliveredProduct | DispatchedProduct;

export default defineComponent({
  components: { GoodsForm },
  name: "ActionTable",
  emits: ["add", "edit", "remove", "update:Contractors", "update:Products"],
  props: {
    headers: { type: Array as PropType<Array<string>>, required: true },
    desserts: { type: Array as PropType<Array<IDBTable>>, required: true },
  },
  data() {
    return {
      showAddModal: false,
      showEditModal: false,
      showRemoveModal: false,
      DBModel: {} as any,
      currentItem: {} as IDBTable,
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
      const document_number: number = this.DBModel.number;
      this.$emit("remove", document_number);
      this.clearDBModel();
    },
  },
});
</script>
