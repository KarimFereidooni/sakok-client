<template>
  <v-dialog v-model="modalVisible">
    <v-card>
      <v-card-title>
        <span class="headline">ویرایش محصول</span>
      </v-card-title>
      <v-card-text>
        <ProductForm name="editProductForm" :productData="productData" @submit="handleSubmit" />
      </v-card-text>
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
