module.exports = {
  Query: {
    user(_root, { id }, ctx) {
      return ctx.connector.user.fetchById(id);
    },
  },
  Mutation: {
    createUser(_root, args, ctx) {
      return ctx.connector.user.create(args);
    },
  },
};
