<template>
  <component :is="component" class="icon"></component>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from "vue";

export default defineComponent({
  props: {
    iconSrc: { type: String }, // iconSrc = close.vue
  },
  computed: {
    component: function () {
      return defineAsyncComponent(
        () => import(`@/assets/icons/${this.iconSrc}`)
      );
    },
  },
});
</script>

<style scoped>
.icon {
  height: 18px;
  width: 18px;
  float: right;
}
.icon:hover {
  filter: invert(41%) sepia(98%) saturate(5630%) hue-rotate(242deg)
    brightness(97%) contrast(91%);
}
</style>
