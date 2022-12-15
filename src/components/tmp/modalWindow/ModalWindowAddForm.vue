<template>
  <base-modal v-bind="$attrs">
    <template v-slot:body>
      <div class="content">
        <div class="form">
          <div class="form-row" v-for="header of headers" :key="header">
            <div class="form-input-block" v-if="header != 'id'">
              <base-input
                :type="isItDate(header) ? 'date' : 'text'"
                :modelValue="dbModel[header]"
                v-model="dbModel[header]"
                class="input"
                >{{ header }}</base-input
              >
            </div>
            <div class="form-button-block">
              <va-button
                class="form-button"
                v-if="isTable(header)"
                @click="callChooseEvent(header)"
              >
                <span>+</span>
              </va-button>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="option">
        <va-button @click="$emit('agree', dbModel)" class="option-button">
          <span>Ok</span>
        </va-button>
        <va-button @click="$emit('close')" class="option-button">
          <span>Cancel</span>
        </va-button>
      </div>
    </template>
  </base-modal>
  <modal-chose-table
    @close="closeChooseEvent()"
    @clickBodyRow="chooseItem($event)"
    v-if="isChoose"
    :name="chooseName"
  ></modal-chose-table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseModal from "@/components/tmp/BaseModal.vue";
import BaseInput from "@/components/tmp/BaseInput.vue";
import ModalChoseTable from "@/components/tmp/modalWindow/ModalChooseTable.vue";
import { isTable } from "@/utils";


export default defineComponent({
  components: { BaseModal, BaseInput, ModalChoseTable },
  emits: ["agree", "close"],
  data() {
    return {
      dbModel: new Object() as { [index: string]: any },
      headers: this.$attrs.headers,
      isChoose: false,
      chooseName: "" as string,
      selectedItem: {} as any,
    };
  },
  methods: {
    chooseItem(item: any) {
      this.selectedItem = item;
    },
    clearSelectedItem() {
      this.selectedItem = {} as any;
    },
    pushToModelSelectedItem() {
      this.dbModel[this.chooseName] = this.selectedItem.name;
      this.dbModel[`${this.chooseName}_id`] = this.selectedItem.id;
    },
    isItDate(str: string): boolean {
      return str === "date";
    },
    isTable,
    changeChooseModalStatus() {
      this.isChoose = !this.isChoose;
    },
    setChooseName(name: string) {
      this.chooseName = name;
    },
    clearChooseName() {
      this.chooseName = "";
    },
    callChooseEvent(name: string) {
      this.changeChooseModalStatus();
      this.setChooseName(name);
    },
    closeChooseEvent() {
      this.changeChooseModalStatus();
      if (this.selectedItem !== null) {
        this.pushToModelSelectedItem();
      } else {
        // TODO: Use try catch
        console.log("Error, ModalWindowAdd");
      }
      this.clearChooseName();
      this.clearSelectedItem();
    },
  },
});
</script>

<style scoped>
.option {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.content {
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
}
.form {
  display: flex;
  flex-direction: column;
  align-items: left;
}
.form-row {
  display: flex;
  flex-direction: row;
  width: max-content;
}
.input {
  min-width: 190px;
}
.form-button-block {
  padding-top: 3%;
  padding-bottom: 3%;
}
.form-button {
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
