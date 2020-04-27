<template>
  <form @submit.prevent="submit" :name="name" :id="name">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field dense :rules="nameRules" required autofocus v-model="item.name" label="نام" persistent-hint hint="نام محصول"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field dense v-model="item.description" label="توضیحات" persistent-hint hint="توضیحات محصول"></v-text-field>
        </v-col>
      </v-row>
      <v-card class="mt-3">
        <v-card-title>
          ویژگی ها
          <v-spacer></v-spacer>
          <v-btn icon color="primary" @click="addProperty">
            <v-icon large>
              mdi-plus
            </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row v-for="(prop, index) in item.properties" :key="index">
            <v-col sm="5">
              <v-combobox
                dense
                :items="propertyItems"
                v-model="prop.name"
                label="نام ویژگی"
                persistent-hint
                hint="نام ویژگی را وارد کنید یا یک مورد را انتخاب کنید"
              ></v-combobox>
            </v-col>
            <v-col sm="6">
              <v-text-field dense v-model="prop.value" label="مقدار"></v-text-field>
            </v-col>
            <v-col sm="1">
              <v-btn icon color="error" @click="removeProperty(index)">
                <v-icon>
                  mdi-delete
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
  </form>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    productData: {
      type: Object as () => { _id: string; name: string; description: string; properties: { name: string; value: string }[] },
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
        description: "",
        properties: [
          {
            name: "",
            value: ""
          }
        ]
      },
      nameRules: [v => !!v || "نام محصول را وارد کنید"],
      propertyItems: ["اندازه", "ابعاد", "قیمت"]
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
        description: "",
        properties: []
      };
    },
    addProperty() {
      this.item.properties.push({
        name: "",
        value: ""
      });
    },
    removeProperty(index) {
      this.item.properties.splice(index, 1);
    }
  },
  watch: {
    productData(newValue) {
      this.item = newValue;
    }
  }
});
</script>
