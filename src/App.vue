<template>
  <div class="main">
    <div class="sidebar">
      <the-sidebar></the-sidebar>
    </div>
    <div class="router">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import TheSidebar from "@/components/sidebar/TheSidebar.vue";

import { defineComponent } from "vue";

export default defineComponent({
  components: {
    TheSidebar,
  },
});
</script>

<style>
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
body {
  margin: 0px !important;
  padding: 0px !important;
}
#app {
  font-family: Avenge, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: var(--light-tone);
  margin: 0 auto;
  padding: 0px;
}
.main {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
}
.sidebar {
  height: 100vh;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}
.router {
  display: flex;
  background-color: var(--light-tone);
  margin-left: 30px;
  margin-right: 30px;
  width: 100%;
  max-height: 100vh;
  border-radius: 8px;
}
</style>
