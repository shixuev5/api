import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import * as path from 'path';
import { db, secret } from '../../../config.json';

export default (appInfo: EggAppInfo) => {
  // tslint:disable-next-line:no-object-literal-type-assertion
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = secret;

  // add your egg config in here
  config.middleware = ['errorHandler'];

  // 只对 /api/v1 前缀的 url 路径生效
  config.errorHandler = {
    match: '/api/v1',
  };

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
    ignore: [ (ctx) => ctx.path.endsWith('users') && ['POST', 'PUT'].includes(ctx.method), /users\/exsit$/],
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
