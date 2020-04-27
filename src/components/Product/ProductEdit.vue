<template>
  <v-dialog v-model="modalVisible" scrollable class="dialog">
    <v-card>
      <v-card-title>
        <v-btn icon @click="cancel" class="ml-2">
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
        <span class="headline">ویرایش محصول</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="dialogContent">
        <ProductForm :key="modalVisible ? productData._id : 0" name="editProductForm" :productData="productData" :submitHandler="handleSubmit" />
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn text :loading="saving" type="submit" form="editProductForm" color="success">
          تایید
        </v-btn>
        <v-btn form="editProductForm" text color="danger" @click="cancel()">
          انصراف
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import ProductForm from "@/components/Product/ProductForm.vue";
import ProductService from "@/services/ProductService";

export default Vue.extend({
  props: {
    value: {
      type: Boolean,
      default: false
    },
    productData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      modalVisible: this.value,
      saving: false
    };
  },
  components: {
    ProductForm
  },
  methods: {
    async handleSubmit(data) {
      try {
        this.saving = true;
        await ProductService.updateProduct(data._id, data);
        this.modalVisible = false;
        this.$emit("editSuccess");
      } catch (error) {
        this.showErrorMessage(error);
      } finally {
        this.saving = false;
      }
    },
    cancel() {
      this.modalVisible = false;
    }
  },
  watch: {
    value(newValue) {
      this.modalVisible = newValue;
    },
    modalVisible(newValue) {
      this.$emit("input", newValue);
    }
  }
});
</script>

<style scoped>
.dialog {
  width: 90%;
}
.dialogContent {
  height: 100vh;
}
</style>
