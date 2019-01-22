import { Context, EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

function ignore(ctx: Context): boolean {
  const routes = [
    {
      method: 'GET',
      path: /users\/check$/,
    },
    {
      method: 'POST',
      path: /users$/,
    },
    {
      method: 'POST',
      path: /users\/session$/,
    },
  ];
  return routes.some((route: { method: string | string[], path: RegExp }): boolean => {
    if (route.method === '*') {
      return route.path.test(ctx.path);
    } else {
      if (typeof route.method === 'string') {
        route.method = [route.method];
      }
      return route.method.includes(ctx.method) && route.path.test(ctx.path);
    }
  });
}

export default (_appInfo: EggAppInfo) => {

  const config = {} as PowerPartial<EggAppConfig>;

  // add your egg config in here
  config.middleware = ['errorHandler'];

  // 只对 /api/v1 前缀的 url 路径生效
  config.errorHandler = {
    match: '/api/v1',
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  config.security = {
    csrf: {
      ignore: () => true,
    },
  };

  config.jwt = {
    enable: true,
    secret: config.keys,
    ignore,
  };

  config.io = {
    init: {},
    namespace: {
      '/': {
        connectionMiddleware: [],
        packetMiddleware: [],
      },
    },
  };

  config.bodyParser = {
    jsonLimit: '10mb',
  };

  return config;
};
