import { Application } from 'egg';
import { createRoute } from './utils/index';

const routes = {
  users: [
    {
      path: '',
      method: 'get',
      action: 'index',
    },
    {
      path: '',
      method: 'post',
      action: 'create',
    },
    {
      path: '',
      method: 'put',
      action: 'login',
    },
    {
      path: ':id',
      method: 'get',
      action: 'show',
    },
    {
      path: ':id',
      method: 'patch',
      action: 'update',
    },
    {
      path: ':id',
      method: 'del',
      action: 'destroy',
    },
  ],
};

export default (app: Application) => {
  // socket.io
  // io.of('/').route('server', io.controller.default.ping);

  createRoute(app.router, 'api/v1', routes);
};
