export function createRoute(router, prefix = 'api/v1', routes = {}) {
  for (const key in routes) {
    if (routes.hasOwnProperty(key)) {
      const routeArray = routes[key];
      routeArray.forEach((route) => {
        const { path, method, action } = route;
        router[method](`/${prefix}/${key}`.concat(path ? `/${path}` : ''), `${key}.${action}`);
      });
    }
  }
};