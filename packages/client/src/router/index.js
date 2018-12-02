import Vue from "vue";
import Router from "vue-router";
import nprogress from "nprogress";
import routes from "./routes";
import store from "@/store";
import * as types from "@/store/types";
import { resolveRoutes } from "@/utils/routes";

Vue.use(Router);

const router = new Router({
  routes: resolveRoutes(routes)
});

router.beforeEach(async function(to, from, next) {
  if(to.path !== from.path) nprogress.start();
  const user = store.state.user;
  if (to.meta.auth) {
    if (user.isLogin) {
      if (!user.info) await store.dispatch(types.USER_INFO);
      next();
    } else {
      next("/login");
    }
  } else {
    user.isLogin ? next("/") : next();
  }
});

router.afterEach(function() {
  nprogress.done();
});

export default router;
