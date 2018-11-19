import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  graphql: {
    enable: true,
    package: 'egg-graphql',
  },
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
};

export default plugin;
