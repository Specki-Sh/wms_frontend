<template>
  <base-modal>
    <template #body>
      <div class="massage">
        <span>Are you sure?</span>
      </div>
    </template>
    <template #footer>
      <div class="option">
        <base-button @click="$emit('agree')" class="option-button">
          <span>Ok</span>
        </base-button>
        <base-button @click="$emit('close')" class="option-button">
          <span>Cancel</span>
        </base-button>
      </div>
    </template>
  </base-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseModal from "@/components/BaseModal.vue";

export default defineComponent({
  components: { BaseButton, BaseModal },
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
