import Vue from "vue";
import Router from "vue-router";
import routes from "./routes";
import store from '@/store';
import * as types from '@/store/types';
import { resolveRoutes } from "@/utils/routes";

Vue.use(Router);

const router = new Router({
  routes: resolveRoutes(routes)
});

router.beforeEach(function(to, from, next) {
  const user = store.state.user;
  if (to.meta.auth) {
    if(user.isLogin) {
      if(!user.info) store.dispatch(types.USER_INFO);
      next();
    } else {
      next('/login');
    }
  } else {
    user.isLogin ? next('/') : next();
  }
});

export default router;
