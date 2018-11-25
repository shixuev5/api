import { Application } from 'egg';

export default (app: Application) => {
  const { router, controller } = app;

  // socket.io
  // io.of('/').route('server', io.controller.default.ping);

  // users
  router.resources('users', '/api/v1/users', controller.users);
  router.post('/api/v1/users/login', controller.users.login);
  router.get('/api/v1/users/search', controller.users.search);
};
