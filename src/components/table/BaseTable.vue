<template>
  <div class="content">
    <div class="title">
      <slot name="title">
        <span class="title-span">{{ name }}</span>
        <slot name="title-content" />
      </slot>
    </div>

    <div class="table-block">
      <slot name="table">
        <table class="table">
          <slot name="header">
            <thead>
              <tr class="table-row row-header">
                <th
                  v-for="header in headers"
                  :key="header"
                  class="table-column column-header"
                >
                  {{ header }}
                </th>
                <slot name="column-header"></slot>
              </tr>
            </thead>
          </slot>
          <slot name="body">
            <tbody class="tableBody">
              <tr
                v-for="(dessert, index) of desserts"
                :key="dessert"
                @click="$emit('clickBodyRow', dessert)"
                class="table-row row-body"
              >
                <td
                  v-for="header of headers"
                  :key="header"
                  class="table-column column-body"
                >
                  {{ dessert[header] }}
                </td>
                <slot
                  :id="dessert['id']"
                  :index="index"
                  name="column-dessert"
                ></slot>
              </tr>
            </tbody>
          </slot>
        </table>
      </slot>
    </div>

    <slot name="footer"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    headers: { type: Array },
    desserts: { type: Array },
    name: { type: String as PropType<string> },
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
.content {
  border: 2px var(--gray-tone-8) solid;
  border-radius: 16px;
  color: var(--gray-tone-80);
  padding-top: 7px;
  padding-bottom: 7px;
}
.title {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: stretch;
  align-content: stretch;
}
.title-span {
  display: flex;
  margin-left: 10px;
  margin-top: auto;
  margin-bottom: auto;
  color: var(--gray-tone-100);
  font-size: large;
  text-transform: uppercase;
}
/* table */
.table-block {
  overflow: auto;
}
.table {
  margin: 0px;
  border-collapse: collapse;
}
.column-header {
  border-bottom: 2px var(--gray-tone-8) solid;
  text-align: left;
}
.table-column {
  padding: 4px;
  position: relative;
}
.table-block {
  border-bottom: 2px var(--gray-tone-8) solid;
  border-top: 2px var(--gray-tone-8) solid;
}
.row-body:hover {
  background-color: rgba(93, 66, 255, 0.05);
}
</style>
