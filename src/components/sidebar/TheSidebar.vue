<template>
  <nav class="navigation" :class="{ active: sidebarStatus }">
    <div class="nav_icon">
      <i>
        <menu-icon @click="changeSidebarStatus" width="20px" height="20px"
      /></i>
    </div>
    <ul class="nav_list">
      <li class="list-item">
        <router-link to="Home">
          <i>
            <home-icon class="link-icon" width="32px" height="32px">
            </home-icon>
          </i>
          <span class="text">home</span>
        </router-link>
      </li>

      <!-- <li class="list-item" data-tooltip="Warehouse">
        <router-link to="/warehouse">
          <i
            ><warehouse-icon
              class="link-icon"
              width="32px"
              height="32px"
            ></warehouse-icon
          ></i>
          <span class="text">warehouse</span>
        </router-link>
      </li> -->

      <li class="list-item">
        <router-link to="/product">
          <i
            ><product-icon
              class="link-icon"
              width="32px"
              height="32px"
            ></product-icon
          ></i>
          <span class="text">{{ translationsSidebarRus["products"] }}</span>
        </router-link>
      </li>
      <li class="list-item">
        <va-collapse v-model="contractorCollapse" style="width: 100%">
          <template #header>
            <div class="sidebar-item">
              <i>
                <contractors-icon
                  class="link-icon"
                  width="32px"
                  height="32px"
                ></contractors-icon>
              </i>
              <span class="text">{{
                translationsSidebarRus["contractors"]
              }}</span>
            </div>
          </template>
          <template #default>
            <div class="dropdown-list">
              <div class="dropdown-item">
                <router-link to="/contractors/customer">
                  <span class="text">{{
                    translationsSidebarRus["customers"]
                  }}</span>
                </router-link>
              </div>
              <div class="dropdown-item">
                <router-link to="/contractors/supplier">
                  <span class="text">{{
                    translationsSidebarRus["suppliers"]
                  }}</span>
                </router-link>
              </div>
            </div>
          </template>
        </va-collapse>
      </li>
      <li class="list-item">
        <router-link to="/acceptance">
          <i
            ><acceptance-icon
              class="link-icon"
              width="32px"
              height="32px"
            ></acceptance-icon
          ></i>
          <span class="text">{{ translationsSidebarRus["acceptance"] }}</span>
        </router-link>
      </li>

      <li class="list-item">
        <router-link to="/expense">
          <i>
            <expense-icon class="link-icon" width="32px" height="32px">
            </expense-icon
          ></i>
          <span class="text">{{ translationsSidebarRus["expense"] }}</span>
        </router-link>
      </li>
      <li class="list-item">
        <router-link to="/report">
          <i
            ><report-icon
              class="link-icon"
              width="32px"
              height="32px"
            ></report-icon
          ></i>
          <span class="text">{{ translationsSidebarRus["report"] }}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import menu from "@/assets/icons/sidebar/menu.vue";
import product from "@/assets/icons/sidebar/product.vue";
import contractors from "@/assets/icons/sidebar/contractors.vue";
// import delivered_product from "@/assets/icons/sidebar/delivered_product.vue";
// import dispatched_product from "@/assets/icons/sidebar/dispatched_product.vue";
// import warehouse from "@/assets/icons/sidebar/warehouse.vue";
import home from "@/assets/icons/sidebar/home.vue";
import acceptance from "@/assets/icons/sidebar/acceptance.vue";
import expense from "@/assets/icons/sidebar/expense.vue";
import report from "@/assets/icons/sidebar/report.vue";

export default defineComponent({
  components: {
    MenuIcon: menu,
    ProductIcon: product,
    ContractorsIcon: contractors,
    // DeliveredProductIcon: delivered_product,
    // DispatchedProductIcon: dispatched_product,
    // WarehouseIcon: warehouse,
    HomeIcon: home,
    ReportIcon: report,
    AcceptanceIcon: acceptance,
    ExpenseIcon: expense,
  },
  data() {
    return {
      sidebarStatus: false, // false - open, true - close
      contractorCollapse: false,
      translationsSidebarRus: require("../../lang/rus/sidebar.json"),
    };
  },
  methods: {
    changeSidebarStatus: function () {
      this.sidebarStatus = !this.sidebarStatus;
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

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.navigation {
  width: 13rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--gray-tone-8);
  transition: 167ms ease;
  position: relative;
}
.active {
  width: 3rem;
  border-right: 2px var(--gray-tone-8) solid;
  background-color: var(--full-white);
}

.nav_icon {
  display: flex;
  width: max-content;
  height: 3rem;
  align-items: center;
  margin-inline: min(0.75rem, 50%);
  transform: rotatez(270deg);
  justify-content: center;
  transition: all 200ms linear;
}

.list-item i {
  color: var(--accent-tone-100);
}

.link-icon {
  /* filter for var(--gray-tone-80) */
  filter: invert(27%) sepia(35%) saturate(387%) hue-rotate(198deg)
    brightness(93%) contrast(89%);
}

.list-item:hover .link-icon {
  /* filter for var(--accent-tone-100) */
  filter: invert(40%) sepia(39%) saturate(1624%) hue-rotate(217deg)
    brightness(89%) contrast(112%);
}

.nav_icon i {
  width: 1.5rem;
  font-size: 1.5rem;
  margin-inline: min(0.75rem, 50%);
  cursor: pointer;
  color: var(--gray-tone-80);
}

.nav_icon i:hover {
  color: var(--accent-tone-100);
  transform: scale(1.15);
}
.active .nav_icon {
  transform: rotatez(0deg);
}

.nav_list {
  list-style: none;
  font-size: 16px;
}
.list-item {
  height: auto;
  display: flex;
  transition: background 166ms ease;
  position: relative;
}

.list-item:nth-of-type(8) {
  margin-top: 3rem;
}
.list-item::after {
  content: "";
  position: absolute;
  width: 100%;
  height: calc(100% - 12px);
  top: 50%;
  transform: translateY(-50%);
  transition: opacity 166ms ease;
  background: linear-gradient(to right, var(--accent-tone-100) 3px, 3px, #0000);
  opacity: 0;
  pointer-events: none;
}

.list-item:hover {
  background: rgba(219, 220, 228, 0.6);
}

.list-item:hover::after {
  opacity: 1;
}

@keyframes showTooltip {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.list-item i {
  padding: 0.25rem;
  margin-left: 8px;
  align-items: center;
  justify-content: center;
  width: 2rem;
  display: inline-flex;
  font-size: 1.5rem;
  color: var(--accent-tone-100);
}

a,
.text {
  overflow: hidden;
  gap: 0.75rem;
  text-decoration: none;
  align-items: center;
  display: flex;
  height: inherit;
  color: #333;
  flex-grow: 1;
}
.sidebar-item {
  height: auto;
  display: flex;
  gap: 0.75rem;
  transition: background 166ms ease;
  position: relative;
}
.dropdown-list {
  display: flex;
  flex-flow: column nowrap;
  height: auto;
}
.dropdown-list .dropdown-item {
  height: 30px;
  margin-left: 40px;
}
.dropdown-item .text:hover {
  color: var(--accent-tone-100);
}
</style>
