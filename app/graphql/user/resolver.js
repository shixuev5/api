module.exports = {
  Query: {
    user(_root, { id }, ctx) {
      return ctx.connector.user.fetchById(id);
    },
    users(_root, { ids }, ctx) {
      return ctx.connector.user.fetchByIds(ids);
    },
  },
  Mutation: {
    createUser(_root, args, ctx) {
      return ctx.connector.user.create(args);
    },
    updateUser(_root, { id, ...args }, ctx) {
      return ctx.connector.user.update(id, args);
    },
    deleteUser(_root, { id }, ctx) {
      return ctx.connector.user.delete(id);
    }
  },
};
