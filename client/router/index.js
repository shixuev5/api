import Vue from "vue";
import Router from "vue-router";
import routes from "./routes";
import store from '@/store';
import { resolveRoutes } from "@/utils/routes";

Vue.use(Router);

const router = new Router({
  routes: resolveRoutes(routes)
});

router.beforeEach(function(to, from, next) {
  if (!to.meta.auth) {
    // token 过期时间判断
    if(store.state.user.isLogin) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router;
