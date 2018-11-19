export function resolveRoutes(routes) {
  routes.forEach(route => {
    if (route.children) resolveRoutes(route.children);

    const routePath = route.component;
    const componentName = route.component.replace(/.*\/(\w+)$/, "$1");
    const asyncComponent = /Layout/.test(componentName)
      ? () => import(`@/layouts/${routePath}.vue`)
      : () => import(`@/views/${routePath}.vue`);

    if (route.layout) {
      route.layout = Array.isArray(route.layout)
        ? route.layout
        : [route.layout];
      route.layout.reverse();
      route.component = {
        components: { [componentName]: asyncComponent },
        render(h) {
          return route.layout.reduce(
            (pre, cur) => h(cur, [pre]),
            h(componentName)
          );
        }
      };
    } else {
      route.component = asyncComponent;
    }
  });
  return routes;
}
