<template>
  <ul class="ul">
    <li v-if="currentPage > 3" @click="clickPagination(1)" class="li">
      <span class="span">first</span>
    </li>
    <li @click="clickPagination(currentPage - 1)" class="li arrow">
      <span class="span">&lt;</span>
    </li>
    <li
      v-for="i in list"
      :key="i"
      @click="clickPagination(i)"
      class="li"
      :class="{ active: i === currentPage }"
    >
      <span class="span">
        {{ i }}
      </span>
    </li>
    <li @click="clickPagination(currentPage + 1)" class="li arrow">
      <span class="span">&gt;</span>
    </li>
    <li
      v-if="length - currentPage > 3"
      @click="clickPagination(length)"
      class="li"
    >
      <span class="span">last</span>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      currentPage: 1,
      listLength: 5,
    };
  },
  props: {
    length: { type: Number, required: true },
  },
  computed: {
    list(): Array<number> {
      const list = [this.currentPage];
      let left = true,
        right = true;
      let quantityOfPages = this.listLength - 1;
      let iterate = 0;
      while (quantityOfPages > 0 && (left || right)) {
        iterate++;
        right = this.currentPage + iterate <= this.length;
        left = this.currentPage - iterate > 0;
        if (right) {
          list.push(this.currentPage + iterate);
          quantityOfPages--;
        }
        if (left) {
          list.unshift(this.currentPage - iterate);
          quantityOfPages--;
        }
      }
      return list;
    },
  },
  methods: {
    setCurrentPage(page: number) {
      this.currentPage = page;
    },
    clickPagination(page: number) {
      if (1 <= page && page <= this.length) {
        this.$emit("clickPagination", page);
        this.setCurrentPage(page);
      }
    },
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

.ul {
  list-style-type: none;
  user-select: none;
  padding-left: 0;
  width: max-content;
}

.li {
  border: 2px var(--gray-tone-8) solid;
  border-radius: 16px;
  display: inline;
  cursor: pointer;
}

.span {
  text-decoration: none;
  color: var(--gray-tone-80);
}

.ul .li {
  margin: 4px;
  padding: 8px 16px;
  background-color: var(--light-tone);
}

.ul .li:hover {
  background-color: var(--accent-opac-8);
}

.ul .active {
  background-color: var(--accent-tone-50);
}

.ul .active:hover {
  background-color: var(--accent-tone-100);
}
.ul .active .span {
  color: var(--white-full);
}
</style>
