<template>
  <base-modal>
    <template #body>
      <div class="massage">
        <span>Are you sure?</span>
      </div>
    </template>
    <template #footer>
      <div class="option">
        <va-button @click="$emit('agree')" class="option-button">
          <span>Ok</span>
        </va-button>
        <va-button @click="$emit('close')" class="option-button">
          <span>Cancel</span>
        </va-button>
      </div>
    </template>
  </base-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseModal from "@/components/tmp/BaseModal.vue";

export default defineComponent({
  components: { BaseModal },
  emits: ["agree", "close"],
});
</script>

<style scoped>
.option {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  align-items: stretch;
  align-content: stretch;
}
</style>
