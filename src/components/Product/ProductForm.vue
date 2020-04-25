<template>
  <form @submit.prevent="submit" :name="name" :id="name">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field required autofocus v-model="item.name" label="نام" persistent-hint hint="نام محصول"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="item.description" label="توضیحات" persistent-hint hint="توضیحات محصول"></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </form>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    productData: {
      type: Object as () => { _id: string; name: string; description: string },
      default: null,
      required: false
    },
    name: {
      type: String,
      default: "product-form",
      required: false
    },
    submitHandler: {
      type: Function,
      required: false
    }
  },
  data() {
    return {
      item: this.productData || {
        _id: "",
        name: "",
        description: ""
      }
    };
  },
  methods: {
    async submit() {
      if (this.submitHandler) {
        await this.submitHandler(this.item);
        this.resetForm();
      }
    },
    resetForm() {
      this.item = {
        _id: "",
        name: "",
        description: ""
      };
    }
  },
  watch: {
    productData(newValue) {
      this.item = newValue;
    }
  }
});
</script>
