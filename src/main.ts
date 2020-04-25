import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

import vuetify from "./plugins/vuetify";
import "@/plugins/sweetAlert";
import "@/plugins/vue-moment-jalaali";
import "@/plugins/prototype";
import "@/plugins/filters";
import "@/plugins/finalForm";
import "@/plugins/axios";
import "@/plugins/mdi";

import "@/assets/style/iransans.css";
import "@/assets/style/app.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
