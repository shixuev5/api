import Vue from "vue";
import Router from "vue-router";
import routes from "./routes";
import { resolveRoutes } from "@/utils/routes";

Vue.use(Router);

const router = new Router({
  routes: resolveRoutes(routes)
});

router.beforeEach(function(to, from, next) {
  if (!to.meta.auth) {
    next();
  }
  next();
});

router.afterEach(function(to, from) {});

export default router;
