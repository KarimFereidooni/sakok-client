<template>
  <form @submit.prevent="submit" :name="name" :id="name">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field required autofocus v-model="item.name" label="نام محصول"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="item.description" label="توضیحات"></v-text-field>
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
    submit() {
      this.$emit("submit", this.item);
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
