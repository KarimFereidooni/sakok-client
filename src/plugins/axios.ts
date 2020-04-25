import Vue from "vue";
import axios from "axios";
import AppConfig from "../../app-config.json";

if (AppConfig.BackendUrl) {
  axios.defaults.baseURL = AppConfig.BackendUrl;
}

// Add a request interceptor
axios.interceptors.request.use(config => {
  return config;
});

Vue.prototype.axios = axios;

declare module "vue/types/vue" {
  interface Vue {
    axios: typeof axios;
  }
}

export default axios;
