<template>
  <div v-for="label of labels" :key="label">
    <va-input
      v-if="label !== 'id'"
      class="mb-4"
      large
      :model-value="modelValue[label]"
      @input="
        $emit('update:modelValue', {
          ...modelValue,
          [label]: $event.target.value,
        })
      "
      :label="label"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    labels: { type: Array, required: true },
    modelValue: { type: Object, required: true },
  },
});
</script>

<style scoped></style>
