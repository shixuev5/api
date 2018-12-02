function resolveConfig(route) {
  const config = route.config.split(".");
  const name = config.length === 1 ? config[0] : config.slice(-1);
  const result = require(`@/config/${config.shift()}`);
  const value = config.length
    ? config.reduce((prev, curr) => prev[curr], result)
    : result[name];
  route.props = route => Object.assign({ [name]: value }, route.query, route.params);
}

function resolveLayout(route) {
  const asyncComponent = route.component;
  route.layout = Array.isArray(route.layout) ? route.layout : [route.layout];
  route.layout.reverse();
  route.component = {
    inheritAttrs: false,
    render(h) {
      return route.layout.reduce(
        (pre, cur) => h(cur, [pre]),
        h(asyncComponent, {
          props: this.$attrs
        })
      );
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
