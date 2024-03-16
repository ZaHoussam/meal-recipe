/* eslint-disable */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/main.scss";
import axios from "axios";

Vue.prototype.$http = axios;

Vue.config.productionTip = false;

Vue.mixin({
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    modifierLink: (nameRoute, nameParam, id) => {
      return {
        name: nameRoute,
        params: { name: nameParam.match(/[a-z]+/gi).join("-") },
        query: { id: id },
      };
    },
    async getData(url) {
      try {
        const response = await this.$http.get(
          `https://www.themealdb.com/api/json/v1/1/${url}`
        );
        this.posts = response.data;
      } catch (error) {
        console.log(Error(error));
      }
    },
  },
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
