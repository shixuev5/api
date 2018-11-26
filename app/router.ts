import { Application } from 'egg';

export default (app: Application) => {
  const { router, controller } = app;

  // socket.io
  // io.of('/').route('server', io.controller.default.ping);

  // users
  router.get('api/v1/user/search', controller.users.search);
};
