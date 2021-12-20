<template>
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
        <va-button @click="$emit('add')">add</va-button>
      </div>
    </template>

    <template #cell(action)>
      <va-button-dropdown size="small" flat class="ml-2">
        <va-button-group flat>
          <va-button @click="$emit('edit', currentItem)" icon="edit">
            Edit
          </va-button>
          <va-button
            @click="$emit('remove', currentItem)"
            icon-right="delete_outline"
          >
            Remove
          </va-button>
        </va-button-group>
      </va-button-dropdown>
    </template>
  </va-data-table>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Product, Supplier, Customer, Receipt, Expense } from "@/api/models";
type IDBTable = Product | Supplier | Customer | Receipt | Expense;

export default defineComponent({
  emits: ["add", "edit", "remove"],
  props: {
    headers: { type: Array as PropType<Array<string>>, required: true },
    desserts: { type: Object, required: true },
  },
  data() {
    return {
      currentItem: null as IDBTable | null,
    };
  },
  methods: {
    setCurrentItem(item: IDBTable): void {
      this.currentItem = item;
    },
  },
});
</script>
