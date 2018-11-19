import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import * as path from 'path';
import { db } from '../config.json';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1542163835910_5000';

  // add your egg config in here
  config.middleware = ['graphql'];

  // mongodb config
  config.mongoose = {
    client: {
      url: `mongodb://${db.host}:${db.port}/${db.database}`,
      options: {
        auth: { authSource: db.authSource },
        user: db.user,
        pass: db.pass,
      },
    },
  };

  config.graphql = {
    // graphql 服务地址
    router: '/graphql',
    // ws 订阅服务地址
    subscribe: '/subscribe',
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
    // 是否加载开发者工具 graphiql, 默认开启。路由同 router 字段。使用浏览器打开该可见。
    graphiql: true,
    // graphQL 路由前的拦截器
    // onPreGraphQL: function* (ctx) {},
    // 开发工具 graphiQL 路由前的拦截器，建议用于做权限操作(如只提供开发者使用)
    // onPreGraphiQL: function* (ctx) {},
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
    secret: config.keys,
    ignore: ['/login', '/explore'],
  };

  config.static = {
    prefix: '/static/',
    dir: path.join(appInfo.baseDir, 'static'),
  };

  config.bodyParser = {
    jsonLimit: '10mb',
  };

  // the return config will combines to EggAppConfig
  return config;
};
