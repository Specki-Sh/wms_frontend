<template>
  <div class="dropdown">
    <span @click="isOpen = !isOpen" class="title">{{ title }}</span>
    <div v-if="isOpen">
      <div @click="isOpen = !isOpen" class="mask"></div>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: { type: String },
  },
  data() {
    return {
      isOpen: false,
    };
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
.title {
  cursor: pointer;
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: table;
  z-index: 998;
}
.content {
  position: absolute;
  background-color: var(--light-tone);
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  padding: 15px;
  margin-left: 20px;
  text-align: left;
  transform: translateX(-100%);
  z-index: 999;
}
</style>
