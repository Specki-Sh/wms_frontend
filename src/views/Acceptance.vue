<template>
  <div class="table">
    <goods-table-action
      :headers="headers"
      :desserts="desserts"
      @add="addItem($event)"
      @get="getItem($event)"
      @remove="removeItem($event)"
      @update:Contractors="updateContractors($event)"
      @update:Products="updateProducts($event)"
      @update:Acceptance_document="UpdateAcceptanceDocument($event)"
    />
    <va-pagination
      class="pagination"
      v-model="page"
      :pages="totalPages"
      input
    />
  </div>
</template>

<script lang="ts">
// vue
import { computed, defineComponent } from "vue";
// Models
import {
  AcceptanceDocument as IAcceptanceDocument,
  Customer as ICustomer,
  DocumentInfo as IDocumentInfo,
  Goods as IGoods,
  headers,
  ProductCard as IProductCard
} from "@/api/models";
// component
import GoodsTableAction from "@/components/Goods/GoodsTableAction.vue";
// api
import api from "@/api/index";

interface ITable<T> {
  items: Array<T>;
  headers: Array<string>;
  totalPages: number;
}

export default defineComponent({
  components: { GoodsTableAction },
  name: "Acceptance",
  data() {
    return {
      headers: headers.document_info,
      desserts: [] as Array<IDocumentInfo>,
      totalPages: 0,
      page: 1,
      contractors: {
        items: [] as Array<ICustomer>,
        totalPages: 0,
        headers: headers.supplier,
      } as ITable<ICustomer>,
      products: {
        items: [] as Array<IProductCard>,
        totalPages: 0,
        headers: headers.product,
      } as ITable<IProductCard>,
      acceptance_document: {} as IAcceptanceDocument
    };
  },
  provide() {
    return {
      contractors: computed(() => this.contractors),
      products: computed(() => this.products),
      acceptance_document: computed(() => this.acceptance_document)
    };
  },
  methods: {
    setDesserts(desserts: Array<IDocumentInfo>) {
      this.desserts = desserts;
    },
    setTotalPages(total: number) {
      this.totalPages = (total - total % 10) / 10;
      if (total % 10 != 0) {total +=1}
    },
    async updateData(page = 1) {
      const data = await api.acceptance.getByPage(page);
      this.setDesserts(data.documents_info);
      this.setTotalPages(data.total);
    },
    addItem(item: any) {
      let goods: Array<IGoods> = [];
      for (const product of item.products){
        goods.push({
          product_id: product.id,
          quantity: product.quantity,
          price: product.price,
        })
      }
      const date: Array<string> = item.date.toLocaleDateString().split('/')
      const acceptance_document: IAcceptanceDocument = {
        number: item.document_number,
        supplier_id: item.contractor.id,
        goods: goods,
        date: [date[2], date[0], date[1]].join('-'),
      }
      api.acceptance.add(acceptance_document).then(
        () => {
          this.updateData(this.page);
        },
        (error: unknown) =>
          console.warn("Function addItem in Acceptance.vue", error)
      );
    },
    // editItem(data: { id: number; item: IAcceptanceDocument }) {
    //   api.acceptance.change(data.id, data.item).then(
    //     () => {
    //       this.updateData(this.page);
    //     },
    //     (error: unknown) =>
    //       console.warn("Function EditItem in Acceptance.vue", error)
    //   );
    getItem(document_number: number) {
      api.accetpance.get_by_document_number(document_number).then(
        () => {
        },
        (error: unknown) =>
          console.warn("Function GetItem in Acceptance.vue", error)
      );
    },
    removeItem(document_number: number) {
      api.acceptance.remove(document_number).then(
        () => {
          this.updateData(this.page);
        },
        (error: unknown) =>
          console.warn("Function removeItem in Acceptance.vue", error)
      );
    },
    setContractorsItems(item: Array<ICustomer>) {
      this.contractors.items = item;
    },
    setContractorsTotalPages(total: number) {
      this.contractors.totalPages = (total - total % 10) / 10;
      if (total % 10 != 0) {this.contractors.totalPages +=1}
    },
    async updateContractors(page = 1) {
      const data = await api.supplier.getByPage(page);
      this.setContractorsItems(data.suppliers);
      this.setContractorsTotalPages(data.total);
    },
    async UpdateAcceptanceDocument(document_number: number) {
      this.acceptance_document = await api.acceptance.getByDocumentNumber(document_number)
    },
    setProducts(item: Array<IProductCard>) {
      this.products.items = item;
    },
    setProductTotalPages(total: number) {
      this.products.totalPages = (total - total % 10) / 10
      if (total % 10 != 0) { this.products.totalPages += 1}
    },
    async updateProducts(page = 1) {
      const data = await api.product.getByPage(page);
      this.setProducts(data.products);
      this.setProductTotalPages(data.total);
    },
  },
  watch: {
    page(newValue) {
      this.updateData(newValue);
    },
  },
  mounted() {
    this.updateData();
    this.updateProducts();
  },
});
</script>

<style>
.table {
  margin-top: 3rem;
  width: 100%;
}
.pagination {
  margin: auto;
}
</style>
