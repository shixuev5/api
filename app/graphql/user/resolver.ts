import { Context } from 'egg';

export default {
  Query: {
    user( _root, { id }, ctx: Context) {
      return ctx.connector.user.fetchById(id);
    },
  },
};
