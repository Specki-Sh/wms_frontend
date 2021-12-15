<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

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
.button {
  color: var(--accent-tone-50);
  background-color: var(--light-tone);
  border: 2px var(--gray-tone-8) solid;
  font-size: medium;
  padding: 8px 16px;
  border-radius: 2px;
}
.button:hover {
  background: rgba(100, 77, 237, 0.08);
  border: 2px rgba(100, 77, 237, 0.08) solid;
  color: var(--accent-tone-100);
}
</style>
