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
        <va-button-group  preset="secondary" border-color="primary">
            <va-button
              @click="viewEvent(row.rowKey.date)"
              icon="visibility"
            ></va-button>
            <va-button
              @click="removeEvent(row.rowIndex)"
              icon="delete_outline"
            ></va-button>
        </va-button-group>

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
<!--    <va-modal-->
<!--      v-model="showEditModal"-->
<!--      @cancel="clearDBModel()"-->
<!--      @ok="editItem()"-->
<!--      title="Edit"-->
<!--    >-->
<!--      <goods-form-->
<!--        :labels="headers"-->
<!--        v-model="DBModel"-->
<!--        @update:Contractors="$emit('update:Contractors', $event)"-->
<!--        @update:Products="$emit('update:Products', $event)"-->
<!--      />-->
<!--    </va-modal>-->
    <va-modal
      v-model="showViewModal"
      @cancel="clearDBModel()"
      @ok="clearDBModel()"
      title="View"
    >
      <goods-form
        :labels="headers"
        v-model="DBModel"
        :readonly="true"
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
import { AcceptanceDocument, ExpenseDocument} from "@/api/models";
import GoodsForm from "./GoodsForm.vue";
type IDBTable = any ;
type IDocument = AcceptanceDocument | ExpenseDocument

export default defineComponent({
  components: { GoodsForm },
  name: "ActionTable",
  emits: ["add", "edit", "remove", "update:Acceptance_document", "update:Contractors", "update:Products"],
  props: {
    headers: { type: Array as PropType<Array<string>>, required: true },
    desserts: { type: Array as PropType<Array<IDBTable>>, required: true },
  },
  inject: ["document"],
  data() {
    return {
      showAddModal: false,
      showEditModal: false,
      showRemoveModal: false,
      showViewModal: false,
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
    // // edit Event
    // editEvent(id: number) {
    //   this.changeEditModalStatus();
    //   this.setDBModel(this.desserts[id]);
    // },
    // changeEditModalStatus() {
    //   this.showEditModal = !this.showEditModal;
    // },
    // editItem() {
    //   const id: number = this.DBModel.id;
    //   this.$emit("edit", { id, item: this.DBModel });
    //   this.clearDBModel();
    // },
    // view Event
    viewEvent(document_number: number) {
      this.changeViewModalStatus();
      this.$emit("update:Acceptance_document", document_number);
      this.setDBModel(this.document);
    },
    changeViewModalStatus() {
      this.showEditModal = !this.showEditModal;
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
