<template>
  <transition name="modal">
    <div class="mask">
      <div class="wrapper">
        <div class="container">
          <div class="header">
            <slot name="header"> </slot>
          </div>

          <div class="body">
            <slot name="body"> default body </slot>
          </div>

          <div class="footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
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
.mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.wrapper {
  display: table-cell;
  vertical-align: middle;
}

.container {
  width: max-content;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: var(--light-tone);
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.header h3 {
  margin-top: 0;
  color: #42b983;
}

.body {
  margin: 20px 0;
}

.default-button {
  float: right;
}

.enter {
  opacity: 0;
}

.leave-active {
  opacity: 0;
}

.enter .container,
.leave-active .container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.close-button {
  flex: none;
}
</style>
