import Vue from "vue";
import Router from "vue-router";
import nprogress from "nprogress";
import isEmpty from "lodash-es/isEmpty";
import routes from "./routes";
import store from "@/store";
import * as types from "@/store/types";
import { resolveRoutes } from "@/utils/routes";

Vue.use(Router);

const router = new Router({
  routes: resolveRoutes(routes),
  strict: process.env.NODE_ENV !== "production"
});

router.beforeEach(function(to, from, next) {
  if (to.path !== from.path) nprogress.start();
  const user = store.state.user;
  if (to.meta.auth) {
    if (user.isLogin) {
      check(to).then(() => next());
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

function check(to) {
  if (isEmpty(store.state.user.info)) {
    return store.dispatch(types.USER_INFO);
  }
  if (to.params.id && /groups/.test(to.path) && isEmpty(store.state.group.info)) {
    return store.dispatch(types.GROUP_INFO);
  }
  if (
    to.params.id &&
    /projects/.test(to.path) &&
    isEmpty(store.state.project.info)
  ) {
    return store.dispatch(types.PROJECT_INFO);
  }
  return Promise.resolve();
}

export default router;
