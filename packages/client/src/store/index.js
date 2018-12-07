import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const modules = {};

function importAll(r) {
  r.keys().forEach(item => {
    const moduleName = item.replace(/\.\/(.+)\.js$/, "$1");
    modules[moduleName] = r(item).default || r(item);
  });
}

importAll(require.context("./modules", false, /\.js$/));

const store = new Vuex.Store({
  modules,
  plugins: [
    // createPersistedState({
    //   key: "api-cache",
    //   storage: sessionStorage
    // }),
    createPersistedState({
      key: "api-cache",
      paths: ['postman']
    }),
  ]
});

export default store;
