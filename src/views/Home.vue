<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-btn text @click="addDialog = true">
        <v-icon>mdi-plus</v-icon>
        <span class="ml-2">ثبت محصول جدید</span>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <v-layout text-center wrap>
          <v-flex xs12>
            <v-card>
              <v-card-title>
                محصولات
                <v-spacer></v-spacer>
                <v-row>
                  <v-col cols="12">
                    <form @submit.prevent="loadData" style="width:100%">
                      <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="جستجوی نام محصول"
                        single-line
                        hint="برای شروع جستجو کلید Enter را فشار دهید"
                        autocomplete="off"
                      ></v-text-field>
                    </form>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-data-table
                :headers="headers"
                :items="products"
                :options.sync="options"
                :server-items-length="totalProducts"
                :loading="loading"
                class="elevation-1"
                show-expand
                :expanded.sync="expanded"
                :single-expand="true"
                item-key="_id"
                loading-text="درحال بارگذاری..."
                must-sort
                sort-by="name"
                :sort-desc="false"
              >
                <template v-slot:item.actions="{ item }">
                  <v-btn icon color="primary">
                    <v-icon small @click="editItem(item)">
                      mdi-pencil
                    </v-icon>
                  </v-btn>
                  <v-btn icon color="error">
                    <v-icon small @click="deleteItem(item)">
                      mdi-delete
                    </v-icon>
                  </v-btn>
                </template>
                <template v-slot:expanded-item="{ headers, item }">
                  <p v-for="property in item.properties" :key="property.name">{{ property.name }} : {{ property.value }}</p>
                </template>
              </v-data-table>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <ProductAdd v-model="addDialog" @addSuccess="loadData" />
    <ProductEdit v-model="editDialog" :productData="editData" @editSuccess="loadData" />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import ProductService from "@/services/ProductService";
import ProductAdd from "@/components/Product/ProductAdd.vue";
import ProductEdit from "@/components/Product/ProductEdit.vue";

export default Vue.extend({
  name: "App",
  components: {
    ProductAdd,
    ProductEdit
  },
  data: () => ({
    addDialog: false,
    editDialog: false,
    editData: null,
    totalProducts: 0,
    products: [],
    loading: true,
    options: {} as any,
    headers: [
      {
        text: "نام محصول",
        value: "name"
      },
      { text: "توضیحات", value: "description" },
      { text: "عملیات", value: "actions", sortable: false, width: 200 }
    ],
    search: "",
    expanded: [] as any[]
  }),
  methods: {
    async loadData() {
      try {
        this.loading = true;
        const { sortBy, sortDesc, page, itemsPerPage } = this.options;
        const result = await ProductService.getProducts(this.search, page, itemsPerPage, sortBy[0] || "", sortDesc[0] || false);
        this.products = result.items;
        this.totalProducts = result.totalCount;
      } catch (e) {
        this.showErrorMessage(e);
      } finally {
        this.loading = false;
      }
    },
    async deleteItem(item) {
      try {
        this.loading = true;
        const qr = await this.$swal({
          title: "حذف محصول",
          text: `از حذف '${item.name}' اطمینان دارید؟`,
          icon: "info",
          buttons: { yes: { text: "بله", value: true }, no: { text: "خیر", value: false } }
        });
        if (qr) {
          await ProductService.deleteProduct(item._id);
          await this.loadData();
        }
      } finally {
        this.loading = false;
      }
    },
    editItem(item) {
      this.editData = JSON.parse(JSON.stringify(item));
      this.editDialog = true;
    }
  },
  watch: {
    options: {
      handler() {
        this.loadData();
      },
      deep: true
    }
  }
});
</script>
