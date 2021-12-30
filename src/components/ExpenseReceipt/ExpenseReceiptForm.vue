<template>
  <div class="header">
    <div class="line document-number">
      <va-input class="mb-4" v-model="value" type="number">
        <template #prepend>
          <span>Document number</span>
        </template>
        <template #prependInner>
          <span>#</span>
        </template>
      </va-input>
    </div>
    <div class="line contractor">
      <va-input
        class="mb-4"
        :model-value="modelValue['contractor']?.name"
        readonly
      >
        <template #prepend>
          <span>Contractor</span>
        </template>
      </va-input>
      <va-button
        @click="selectContractor"
        icon="add"
        class="mr-4"
        outline
        :rounded="false"
      />
    </div>
    <div class="line date">
      <va-date-input
        :model-value="modelValue['date']"
        @update:model-value="
          $emit('update:modelValue', {
            ...modelValue,
            ['date']: $event,
          })
        "
      >
        <template #prepend>
          <span>Date</span>
        </template>
      </va-date-input>
    </div>
  </div>
  <div class="product-table">
    <va-data-table
      :items="modelValue['products']"
      :columns="[...products.value.headers, 'quantity', 'action']"
    >
      <template #headerPrepend>
        <div class="title-content">
          <span>Products</span>
          <va-button
            @click="selectProducts()"
            icon="add"
            class="mr-4"
            outline
            :rounded="false"
          />
        </div>
      </template>

      <template #cell(quantity)="row">
        <va-input
          :model-value="modelValue.products[row.rowIndex].quantity"
          @update:model-value="addProductsQuantity(row.rowIndex, $event)"
        />
      </template>

      <template #cell(action)="row">
        {{ slotProps }}
        <va-button
          @click="removeProducts(row.rowIndex)"
          icon="delete_outline"
          flat
        />
      </template>
    </va-data-table>
  </div>

  <va-modal
    v-model="contractorAction.showModal"
    @cancel="clearContractorCurrentPage()"
    @ok="setContractor()"
  >
    <va-data-table
      :columns="contractors.value.headers"
      :items="contractors.value.items"
      :selectable="true"
      select-mode="single"
      v-model="contractorAction.selectedItems"
      ><template #bodyAppend>
        <tr>
          <td colspan="8" class="table-example--pagination">
            <va-pagination
              v-model="contractorAction.currentPage"
              input
              :pages="contractors.value.totalPages"
            />
          </td>
        </tr>
      </template>
    </va-data-table>
  </va-modal>

  <va-modal
    v-model="productAction.showModal"
    @cancel="clearProductCurrentPage()"
    @ok="setProducts()"
  >
    <va-data-table
      :columns="products.value.headers"
      :items="products.value.items"
      :selectable="true"
      select-mode="multi"
      v-model="productAction.selectedItems"
      ><template #bodyAppend>
        <tr>
          <td colspan="8" class="table-example--pagination">
            <va-pagination
              v-model="productAction.currentPage"
              input
              :pages="products.value.totalPages"
            />
          </td>
        </tr>
      </template>
    </va-data-table>
  </va-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  Supplier as ISupplier,
  Customer as ICustomer,
  Product as IProduct,
} from "@/api/models";
interface IAction<T> {
  showModal: boolean;
  currentPage: number;
  selectedItems: Array<T>;
}
export default defineComponent({
  props: {
    modelValue: { type: Object, required: true },
  },
  emits: ["update:Contractors", "update:modelValue", "update:Products"],
  data() {
    return {
      contractorAction: {
        showModal: false,
        currentPage: 1,
        selectedItems: [] as Array<ISupplier> | Array<ICustomer>,
      } as IAction<ISupplier> | IAction<ICustomer>,
      productAction: {
        showModal: false,
        currentPage: 1,
        selectedItems: [] as Array<IProduct>,
      } as IAction<IProduct>,
    };
  },
  inject: ["contractors", "products"],
  methods: {
    clearContractorAction() {
      this.contractorAction.currentPage = 1;
    },
    changeContractorShowModal() {
      this.contractorAction.showModal = !this.contractorAction.showModal;
    },
    selectContractor() {
      this.changeContractorShowModal();
      this.$emit("update:Contractors", this.contractorAction.currentPage);
    },
    setContractor() {
      this.$emit("update:modelValue", {
        ...this.modelValue,
        ["contractor"]: this.contractorAction.selectedItems[0],
      });
    },

    clearProductCurrentPage() {
      this.productAction.currentPage = 1;
    },
    changeShowModalProducts() {
      this.productAction.showModal = !this.productAction.showModal;
    },
    selectProducts() {
      this.changeShowModalProducts();
      this.$emit("update:Products", this.productAction.currentPage);
    },
    // Todo: Ура первое место где я уверен, что нужен тест. НАПИСАТЬ :)
    setProducts() {
      let items = [] as Array<IProduct>;
      if (this.modelValue.products !== undefined) {
        items = this.modelValue.products;
        items.push(
          ...this.productAction.selectedItems.filter(
            (obj) => !items.some((item) => obj.id === item.id)
          )
        );
      } else {
        items = this.productAction.selectedItems;
      }
      this.$emit("update:modelValue", {
        ...this.modelValue,
        ["products"]: items,
      });
    },
    removeProducts(id: number) {
      let items = this.modelValue.products;
      items.splice(id, 1);
      this.$emit("update:modelValue", {
        ...this.modelValue,
        ["products"]: items,
      });
    },
    addProductsQuantity(id: number, quantity: number) {
      let items = this.modelValue.products;
      items[id].quantity = quantity;
      this.$emit("update:modelValue", {
        ...this.modelValue,
        ["products"]: items,
      });
    },
  },
  watch: {
    "contractorAction.currentPage"() {
      this.$emit("update:Contractors", this.contractorAction.currentPage);
    },
    "productAction.currentPage"() {
      this.$emit("update:Products", this.productAction.currentPage);
    },
  },
});
</script>

<style scoped>
.line {
  display: flex;
  margin: 0 5px;
}
.header {
  display: flex;
  margin: 0 -5px;
  flex-direction: row;
  justify-content: space-around;
}
</style>
