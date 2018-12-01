import Vue from "vue";
import Antd from "ant-design-vue";
import VueSocketio from "vue-socket.io-extended";
import io from "socket.io-client";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "ant-design-vue/dist/antd.css";
import "nprogress/nprogress.css";
import "./styles/index.less";

Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(
  VueSocketio,
  io({
    url: "http://localhost:7001",
    autoConnect: false
  }, {
    store
  })
);

function importAll(r) {
  r.keys().forEach(item => {
    let componentName = (r(item).default || r(item)).name;
    if (!componentName) componentName = item.replace(/.*\/(\w+)\.vue$/, "$1");
    Vue.component(componentName, r(item).default || r(item));
  });
}

importAll(require.context("./components", true, /\.vue$/));
importAll(require.context("./layouts", true, /\.vue$/));

Object.defineProperty(Vue.prototype, "$user", {
  get() {
    return store.state.user;
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
