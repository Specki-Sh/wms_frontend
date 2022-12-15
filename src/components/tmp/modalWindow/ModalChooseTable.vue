<template>
  <base-modal>
    <template #header>
      <span @click="$emit('close')" class="close-button">
        <base-icon iconSrc="close.vue" class="close-icon"></base-icon>
      </span>
    </template>

    <template v-slot:body>
      <base-table
        @dblclick="$emit('close')"
        @clickBodyRow="$emit('clickBodyRow', $event)"
        :headers="headers"
        :desserts="desserts"
      ></base-table>
    </template>
  </base-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseModal from "@/components/tmp/BaseModal.vue";
import BaseTable from "@/components/tmp/table/BaseTable.vue";
import BaseIcon from "@/components/tmp/BaseIcon.vue";
import { headers as allHeaders } from "@/api/models";
import api from "@/api";

export default defineComponent({
  components: { BaseModal, BaseTable, BaseIcon },
  props: {
    name: { type: String },
  },
  data() {
    return {
      desserts: [] as Array<any>,
    };
  },
  computed: {
    headers: function () {
      if (this.name !== undefined) {
        return allHeaders[this.name];
      }
      return null;
    },
  },
  methods: {
    setDesserts(desserts: Array<any>) {
      this.desserts = desserts;
    },
    async updateDessert() {
      if (this.name !== undefined) {
        const desserts = await api[this.name].getAll();

        this.setDesserts(desserts.items);
      }
    },
  },
  mounted() {
    this.updateDessert();
  },
});
</script>

<style scoped>
.option {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>
