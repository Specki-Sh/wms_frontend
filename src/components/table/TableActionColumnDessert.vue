<template>
  <td class="td">
    <base-dropdown title="⋮">
      <template #default>
        <ul class="list-action">
          <li>
            <span class="action-text" @click="$emit('edit')">Edit</span>
          </li>
          <li>
            <span class="action-text" @click="$emit('remove')">Remove</span>
          </li>
        </ul>
      </template>
    </base-dropdown>
  </td>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseDropdown from "@/components/BaseDropdown.vue";

export default defineComponent({
  components: {
    BaseDropdown,
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
.list-action {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.td {
  text-align: center;
  border-left: 2px var(--gray-tone-8) solid;
}
.action-text {
  color: var(--gray-tone-100);
  cursor: pointer;
}
.action-text:hover {
  color: var(--accent-tone-100);
}
</style>
