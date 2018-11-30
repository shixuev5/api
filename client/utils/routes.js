function resolveConfig(route) {
  const config = route.config.split(".");
  route.beforeEnter = async function(to, from, next) {
    const name = config.length === 1 ? config[0] : config.slice(-1);
    const result = await import(`@/config/${config.shift()}`);
    const value = config.length ? config.reduce((prev, curr) => prev[curr] , result) : result[name];
    Object.assign(to.params, { [name]: value });
    next();
  };
}

function resolveLayout(route) {
  const asyncComponent = route.component;
  route.layout = Array.isArray(route.layout) ? route.layout : [route.layout];
  route.layout.reverse();
  route.component = {
    inheritAttrs: false,
    render(h) {
      return route.layout.reduce((pre, cur) => h(cur, [pre]), h(asyncComponent, {
        props: this.$attrs
      }));
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
    route.props = route => Object.assign({}, route.query, route.params);
    route.meta = Object.assign({ auth }, route.meta);
    resolveComponent(route);

    if (route.layout) resolveLayout(route);
    if (route.config) resolveConfig(route);
  });
  return routes;
}
