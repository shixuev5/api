export function resolveRoutes(routes) {
  routes.forEach(route => {
    if (route.children) resolveRoutes(route.children);
    const componentPath = route.component;
    const componentName = route.component.replace(/.*\/(\w+)$/, "$1");
    const asyncComponent = /Layout/.test(componentName)
      ? () => import(`@/layouts/${componentPath}.vue`)
      : () => import(`@/views/${componentPath}.vue`);
    route.component = asyncComponent;
  });
  return routes;
}
