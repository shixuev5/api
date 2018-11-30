function resolveConfig(route) {
  const config = route.config.split(".");
  route.beforeEnter(function(to, from, next) {
    next(async vm => {
      const result = await import(`@/config/${config.shift()}`);
      vm.$config = config.reduce((prev, curr) => prev[curr] , result);
    });
  });
}

function resolveLayout(route) {
  const asyncComponent = route.component;
  route.layout = Array.isArray(route.layout) ? route.layout : [route.layout];
  route.layout.reverse();
  route.component = {
    // provide: {

    // },
    render(h) {
      return route.layout.reduce((pre, cur) => h(cur, [pre]), h(asyncComponent));
    }
  };
}

function resolveComponent(route) {
  const path = route.component;
  const name = path.replace(/.*\/(\w+)$/, "$1");
  const isLayout = /Layout/.test(name);
  route.component = isLayout
    ? () => import(`@/layouts/${path}.vue`)
    : () => import(`@/views/${path}.vue`);
}

export function resolveRoutes(routes, auth = true) {
  routes.forEach(route => {
    if (route.children) {
      resolveRoutes(route.children, route.meta && route.meta.auth);
    }
    route.meta = Object.assign({ auth }, route.meta);
    resolveComponent(route);

    if (route.layout) resolveLayout(route);
    if (route.config) resolveConfig(route);
  });
  return routes;
}
