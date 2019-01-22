import { EggAppConfig, PowerPartial } from 'egg';
import { db, secret } from '../../../config/config.dev.json';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = secret;

  // mongodb config
  config.mongoose = {
    client: {
      url: `mongodb://${db.host}:${db.port}/${db.database}`,
      options: {
        auth: { authSource: db.authSource },
        user: db.user,
        pass: db.pass,
        useCreateIndex: true,
      },
    },
  };

  return config;
};
